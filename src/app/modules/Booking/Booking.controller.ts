import httpStatus from "http-status";
import catchAsync from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking=catchAsync(
    async(req,res)=>{
    const userEmail=   req.user.email




        const result =await BookingServices.createBooking(req.body,userEmail)
        sendResponse(res, {
            success: true,
            message:  "Booking created successfully",
            data: result,
            statusCode:httpStatus.OK
          });
    }
)
export const BookingControllers={
    createBooking
}