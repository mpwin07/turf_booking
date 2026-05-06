import { Router } from "express";
import { z } from "zod";
import { blockedSlots, bookings } from "../data/mockStore.js";

const router = Router();

const blockSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  recurring: z.enum(["daily"]).optional(),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  reason: z.string().min(2)
});

router.get("/bookings", (request, response) => {
  const search = String(request.query.search || "").toLowerCase();
  const results = bookings.filter((booking) =>
    `${booking.customerName} ${booking.phone} ${booking.date}`.toLowerCase().includes(search)
  );

  response.json({ bookings: results });
});

router.patch("/bookings/:id/status", (request, response) => {
  const booking = bookings.find((item) => item.id === request.params.id);

  if (!booking) {
    return response.status(404).json({ message: "Booking not found" });
  }

  booking.bookingStatus = request.body.bookingStatus;
  response.json({ booking });
});

router.get("/blocked-slots", (_request, response) => {
  response.json({ blockedSlots });
});

router.post("/blocked-slots", (request, response) => {
  const payload = blockSchema.parse(request.body);
  const blockedSlot = {
    id: `blocked_${Date.now()}`,
    date: payload.date || null,
    recurring: payload.recurring || null,
    startTime: payload.startTime,
    endTime: payload.endTime,
    reason: payload.reason
  };

  blockedSlots.push(blockedSlot);
  response.status(201).json({ blockedSlot });
});

export default router;
