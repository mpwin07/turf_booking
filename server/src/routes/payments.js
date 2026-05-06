import crypto from "node:crypto";
import { Router } from "express";

const router = Router();

router.post("/verify", (request, response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = request.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    return response.status(500).json({ message: "Razorpay secret is not configured" });
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return response.status(400).json({ verified: false, message: "Invalid payment signature" });
  }

  response.json({ verified: true });
});

export default router;
