export function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function addHours(time, duration) {
  const total = toMinutes(time) + duration * 60;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function overlaps(newStart, newEnd, existingStart, existingEnd) {
  return toMinutes(newStart) < toMinutes(existingEnd) && toMinutes(newEnd) > toMinutes(existingStart);
}

export function isWeekend(date) {
  const day = new Date(`${date}T00:00:00.000Z`).getUTCDay();
  return day === 0 || day === 6;
}
