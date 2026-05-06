import { Router } from "express";
import { z } from "zod";
import { bookings, blockedSlots } from "../data/mockStore.js";
import { calculateBookingAmount } from "../lib/pricing.js";
import { addHours } from "../lib/time.js";
import { findSlotConflict } from "../lib/slotValidation.js";

const router = Router();

const bookingSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  duration: z.number().int().min(1).max(2),
  paymentType: z.enum(["ADVANCE", "FULL"])
});

router.get("/", (_request, response) => {
  response.json({ bookings });
});

router.post("/validate", (request, response) => {
  const payload = bookingSchema.pick({ date: true, startTime: true, duration: true, paymentType: true }).parse(request.body);
  const endTime = addHours(payload.startTime, payload.duration);
  const conflict = findSlotConflict({
    date: payload.date,
    startTime: payload.startTime,
    endTime,
    bookings,
    blockedSlots
  });

  response.json({
    available: !conflict,
    conflict,
    amount: calculateBookingAmount(payload),
    endTime
  });
});

router.post("/", (request, response) => {
  const payload = bookingSchema.parse(request.body);
  const endTime = addHours(payload.startTime, payload.duration);
  const conflict = findSlotConflict({
    date: payload.date,
    startTime: payload.startTime,
    endTime,
    bookings,
    blockedSlots
  });

  if (conflict) {
    return response.status(409).json({
      message: "Slot unavailable",
      conflict
    });
  }

  const booking = {
    id: `booking_${Date.now()}`,
    userId: `user_${Date.now()}`,
    customerName: payload.name,
    phone: payload.phone,
    email: payload.email || null,
    date: payload.date,
    startTime: payload.startTime,
    endTime,
    duration: payload.duration,
    paymentType: payload.paymentType,
    paymentStatus: "PENDING",
    amount: calculateBookingAmount(payload),
    bookingStatus: "PENDING"
  };

  bookings.push(booking);
  response.status(201).json({ booking });
});

export default router;
