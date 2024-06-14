import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { AuthRoute } from "./app/modules/auth/auth.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { NotFound } from "./app/Error/NotFoundError";
import { FacilityRoute } from "./app/modules/Facility/facility.route";
import { BookingRoute } from "./app/modules/Booking/Booking.route";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRoute);
app.use("/api/facility",FacilityRoute)
app.use("/api/booking",BookingRoute)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use('*',NotFound)
app.use(globalErrorHandler);
export default app;
