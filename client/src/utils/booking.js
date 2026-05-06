export function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function addHours(time, hours) {
  const total = toMinutes(time) + hours * 60;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function overlaps(start, end, existingStart, existingEnd) {
  return toMinutes(start) < toMinutes(existingEnd) && toMinutes(end) > toMinutes(existingStart);
}

export function isWeekend(date) {
  const day = new Date(`${date}T00:00:00`).getDay();
  return day === 0 || day === 6;
}

export function formatDisplayDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  }).format(new Date(`${date}T00:00:00`));
}

export function makeDateOptions() {
  return Array.from({ length: 10 }, (_, index) => {
    const date = new Date("2026-05-06T00:00:00");
    date.setDate(date.getDate() + index);
    const iso = date.toISOString().slice(0, 10);
    return {
      iso,
      label: formatDisplayDate(iso),
      available: index !== 2 && index !== 7
    };
  });
}

export function resolveSlotState({ date, start, end, bookings, blockedSlots }) {
  const booked = bookings.find((slot) => slot.date === date && overlaps(start, end, slot.start, slot.end));
  if (booked) return { state: "booked", label: "Booked", detail: booked.name };

  const reserved = blockedSlots.find(
    (slot) => (slot.date === date || slot.recurring === "daily") && overlaps(start, end, slot.start, slot.end)
  );
  if (reserved) return { state: "reserved", label: "Coach Reserved", detail: reserved.reason };

  return { state: "available", label: "Available", detail: "Ready to play" };
}
