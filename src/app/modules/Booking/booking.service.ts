import { Types } from "mongoose";
import { User } from "../User/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

import AppError from "../../Error/AppErrors";
import httpStatus from "http-status";
import { availableSlots, hasConflict } from "./booking.utils";

const createBooking = async (payload: Partial<TBooking>, userEmail: string) => {
  const facultyBooking = await Booking.find({
    facility: payload.facility,
    date: payload.date,
  });

  if (hasConflict(facultyBooking, payload)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "facility is unavailable during the requested time slot"
    );
  }

  const user = await User.isUserExistsByEmail(userEmail);
  if (!user) {
    throw new Error("User not found");
  }

  payload.user = user._id as Types.ObjectId;
  payload.isBooked = "confirmed";

  const result = await Booking.create(payload);
  return result;
};
const getAllBooking = async () => {
  const result = await Booking.find().populate(["facility", "user"]);
  return result;
};

const getUserBooking = async (userEmail: string) => {
  const user = User.isUserExistsByEmail(userEmail);
  if (!user) {
    throw new Error("User not found");
  }
  const result = await Booking.find({ user: (await user)._id });
  return result;
};
const cancelBooking = async (userEmail: string, id: string) => {
  const user = await User.isUserExistsByEmail(userEmail);
  if (!user) {
    throw new Error("User not found");
  }

  const result = await Booking.findOneAndUpdate(
    { _id: id, user: user._id },
    { isBooked: "canceled" },
    { new: true }
  ).populate("facility");

  return result;
};

const checkAvailability = async (date: string) => {
  const bookingSlots = await Booking.find({ date: date }).select(
    "startTime endTime -_id"
  );

  const result = availableSlots(bookingSlots);
  return result;
  
};

export const BookingServices = {
  createBooking,
  getAllBooking,
  getUserBooking,
  cancelBooking,
  checkAvailability,
};
