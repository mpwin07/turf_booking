import assert from "node:assert/strict";
import test from "node:test";
import { findSlotConflict } from "../src/lib/slotValidation.js";
import { overlaps } from "../src/lib/time.js";

test("overlap detection rejects inside, exact start, and left-edge collisions", () => {
  assert.equal(overlaps("19:00", "21:00", "18:00", "20:00"), true);
  assert.equal(overlaps("18:00", "19:00", "18:00", "20:00"), true);
  assert.equal(overlaps("17:00", "19:00", "18:00", "20:00"), true);
});

test("overlap detection allows adjacent slots", () => {
  assert.equal(overlaps("16:00", "18:00", "18:00", "20:00"), false);
  assert.equal(overlaps("20:00", "21:00", "18:00", "20:00"), false);
});

test("slot validation checks bookings and blocked timings", () => {
  const bookings = [
    {
      date: "2026-05-09",
      startTime: "18:00",
      endTime: "20:00",
      bookingStatus: "APPROVED"
    }
  ];
  const blockedSlots = [
    {
      recurring: "daily",
      startTime: "05:00",
      endTime: "07:00"
    }
  ];

  assert.equal(
    findSlotConflict({ date: "2026-05-09", startTime: "19:00", endTime: "21:00", bookings, blockedSlots })?.type,
    "booking"
  );
  assert.equal(
    findSlotConflict({ date: "2026-05-11", startTime: "06:00", endTime: "07:00", bookings, blockedSlots })?.type,
    "blocked"
  );
  assert.equal(
    findSlotConflict({ date: "2026-05-11", startTime: "07:00", endTime: "08:00", bookings, blockedSlots }),
    null
  );
});
