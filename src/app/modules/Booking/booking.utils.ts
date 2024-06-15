import httpStatus from "http-status";
import AppError from "../../Error/AppErrors";
import { TBooking, TSlot } from "./booking.interface";

export const hasConflict = (
  facultyBookings: TBooking[],
  payload: Partial<TBooking>,
) =>
  facultyBookings.some((booking) => {
    const existingStart = new Date(
      `1970-01-01T${booking.startTime}:00Z`,
    ).getTime();
    const existingEnd = new Date(`1970-01-01T${booking.endTime}:00Z`).getTime();
    const newStart = new Date(`1970-01-01T${payload.startTime}:00Z`).getTime();
    const newEnd = new Date(`1970-01-01T${payload.endTime}:00Z`).getTime();

    if (newEnd < newStart) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "StartTime can not higher than endTime",
      );
    }

    return !(newEnd <= existingStart || newStart >= existingEnd);
  });

export const availableSlots = (currentSlots: TSlot[]): TSlot[] => {
  const fullDayStart = "00:00";
  const fullDayEnd = "23:59";

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const minutesToTime = (minutes: number): string => {
    const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mins = String(minutes % 60).padStart(2, "0");
    return `${hours}:${mins}`;
  };

  const fullDayStartMinutes = timeToMinutes(fullDayStart);
  const fullDayEndMinutes = timeToMinutes(fullDayEnd);

  // Sort bookings by start time
  const sortedBookings = currentSlots
    .slice()
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

  const availableSlots: TSlot[] = [];
  let lastEndTime = fullDayStartMinutes;

  sortedBookings.forEach((booking) => {
    const startMinutes = timeToMinutes(booking.startTime);
    const endMinutes = timeToMinutes(booking.endTime);

    // If there is a gap between last end time and current booking start time
    if (startMinutes > lastEndTime) {
      availableSlots.push({
        startTime: minutesToTime(lastEndTime),
        endTime: minutesToTime(startMinutes),
      });
    }

    // Update the last end time to the max of current booking end time
    lastEndTime = Math.max(lastEndTime, endMinutes);
  });
  if (lastEndTime < fullDayEndMinutes) {
    availableSlots.push({
      startTime: minutesToTime(lastEndTime),
      endTime: minutesToTime(fullDayEndMinutes),
    });
  }

  return availableSlots;
};
