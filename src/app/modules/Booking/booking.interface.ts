import { Types } from "mongoose";

export type TBooking = {
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount: number;
  isBooked: "confirmed" | "unconfirmed" | "canceled";
};
export type TSlot = {
  startTime: string;
  endTime: string;
};
