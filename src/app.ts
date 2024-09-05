import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { AuthRoute } from "./app/modules/auth/auth.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { NotFound } from "./app/Error/NotFoundError";
import { FacilityRoute } from "./app/modules/Facility/facility.route";
import { BookingRoute } from "./app/modules/Booking/Booking.route";
import { BookingControllers } from "./app/modules/Booking/Booking.controller";

import cors from "cors";
import { createPaymentIntent } from "./app/modules/payments/payments";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use("/api/auth", AuthRoute);
app.use("/api/facility", FacilityRoute);
app.use("/api/bookings", BookingRoute);
app.post("/api/check-availability/:id", BookingControllers.checkAvailability);
app.post("/api/create-payment-intent", createPaymentIntent);

app.get("/", (req: Request, res: Response) => {
  res.send("Sports Facility Booking Platform!");
});

app.use("*", NotFound);
app.use(globalErrorHandler);
export default app;
