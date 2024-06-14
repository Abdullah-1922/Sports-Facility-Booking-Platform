
import { Types } from "mongoose";
import { User } from "../User/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBooking = async (payload: Partial<TBooking>, userEmail: string) => {
  const user = await User.findOne({ email: userEmail }).select("_id");
  if (!user) {
    throw new Error("User not found");
  }

  payload.user = user._id as Types.ObjectId
  

  const result = await Booking.create(payload);
  return result;
};
export const BookingServices = {
  createBooking,
};
