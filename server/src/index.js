import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bookingRoutes from "./routes/bookings.js";
import adminRoutes from "./routes/admin.js";
import paymentRoutes from "./routes/payments.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, service: "ace-turf-server" });
});

app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);

app.use((error, _request, response, _next) => {
  const status = error.status || 500;
  response.status(status).json({
    message: error.message || "Internal server error"
  });
});

app.listen(port, () => {
  console.log(`ACE turf API running on http://localhost:${port}`);
});
