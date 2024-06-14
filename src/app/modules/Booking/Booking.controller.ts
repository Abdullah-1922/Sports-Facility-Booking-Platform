
import httpStatus from "http-status";
import catchAsync from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import AppError from "../../Error/AppErrors";

const createBooking = catchAsync(async (req, res) => {
  const userEmail = req.user.email;

  const result = await BookingServices.createBooking(req.body, userEmail);
  sendResponse(res, {
    success: true,
    message: "Booking created successfully",
    data: result,
    statusCode: httpStatus.OK,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const userEmail = req.user.email;

  const bookingId = req.params.id as string;

  //    console.log(userEmail);
  const result = await BookingServices.cancelBooking(userEmail, bookingId);
  sendResponse(res, {
    success: result ? true : false,
    message: result ? "Booking cancelled successfully" : "No Data Found",
    data: result || [],
    statusCode: result ? httpStatus.OK : 404,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBooking();
  const isResult = result.length !== 0;
  sendResponse(res, {
    success: isResult ? true : false,
    message: isResult ? "Bookings retrieved successfully" : "No Data Found",
    data: result,
    statusCode: isResult ? httpStatus.OK : 404,
  });
});

const getUserBooking = catchAsync(async (req, res) => {
  const userEmail = req.user.email;
  const result = await BookingServices.getUserBooking(userEmail);
  const isResult = result.length !== 0;
  sendResponse(res, {
    success: isResult ? true : false,
    message: isResult ? "Bookings retrieved successfully" : "No Data Found",
    data: result,
    statusCode: isResult ? httpStatus.OK : 404,
  });
});
const checkAvailability = catchAsync(async (req, res) => {
  let queryDate = req.query.date as string;
  if (queryDate) {
    const regex = /^(?:(?:19|20)\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const validDate = regex.test(queryDate);
    if (!validDate) {
      throw new AppError(404, "Invalid date format");
    }
  }

  if (!queryDate) {
    queryDate = new Date().toISOString().split("T")[0];
  }
  const result = await BookingServices.checkAvailability(queryDate);
  const isResult = result.length !== 0;
  sendResponse(res, {
    success: isResult ? true : false,
    message: isResult ? "Availability checked successfully" : "No Data Found",
    data: result,
    statusCode: isResult ? httpStatus.OK : 404,
  });
});
export const BookingControllers = {
  createBooking,
  cancelBooking,
  getAllBooking,
  getUserBooking,
  checkAvailability,
};
