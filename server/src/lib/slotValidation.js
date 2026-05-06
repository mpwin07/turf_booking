import { overlaps } from "./time.js";

export function findSlotConflict({ date, startTime, endTime, bookings = [], blockedSlots = [] }) {
  const bookingConflict = bookings.find(
    (booking) =>
      booking.date === date &&
      booking.bookingStatus !== "CANCELLED" &&
      overlaps(startTime, endTime, booking.startTime, booking.endTime)
  );

  if (bookingConflict) {
    return { type: "booking", slot: bookingConflict };
  }

  const blockedConflict = blockedSlots.find(
    (slot) =>
      (slot.date === date || slot.recurring === "daily") &&
      overlaps(startTime, endTime, slot.startTime, slot.endTime)
  );

  if (blockedConflict) {
    return { type: "blocked", slot: blockedConflict };
  }

  return null;
}
