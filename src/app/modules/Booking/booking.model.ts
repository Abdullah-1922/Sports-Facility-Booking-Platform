import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { Facility } from "../Facility/facility.model";


const bookingSchema = new Schema<TBooking>(
  {
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    facility: { type: Schema.Types.ObjectId, ref: "Facility", required: true },
    payableAmount: { type: Number, required: true, default: 0 },
    isBooked: {
      type: String,
      enum: ["confirmed", "unconfirmed", "canceled"],
      default: "unconfirmed",
    },
  },
  { versionKey: false }
);

bookingSchema.pre("save", async function (next) {
  const booking = this as TBooking;
  console.log(booking.facility);
  
  const facility = await Facility.findById(booking.facility).select("pricePerHour");
 
  if (!facility) {
    throw new Error("Facility not found");
  }
  // Calculate the duration in hours
  const startTime = new Date(`1970-01-01T${booking.startTime}:00Z`).getTime();
  const endTime = new Date(`1970-01-01T${booking.endTime}:00Z`).getTime();
  const durationInHours = (endTime - startTime) / (1000 * 60 * 60);

  // Calculate the payable amount
  booking.payableAmount = durationInHours * facility.pricePerHour;
  next();
});

export const Booking = model<TBooking>("Booking", bookingSchema);
