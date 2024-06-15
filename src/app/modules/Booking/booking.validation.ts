import { z } from "zod";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?\d|2[0-3]):[0-5]\d$/;
    return regex.test(time);
  },
  {
    message: "Invalid time format , expected 'HH:MM' in 24 hour format",
  },
);

const createBooking = z.object({
  body: z.object({
    facility: z.string({ required_error: "Faculty id is required" }),
    date: z.string({ required_error: "Date id is required" }).refine(
      (date) => {
        const regex =
          /^(?:(?:19|20)\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        return regex.test(date);
      },
      { message: "Invalid date format , expected 'YYYY-MM-DD'" },
    ),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
  }),
});
export const BookingValidation = {
  createBooking,
};
