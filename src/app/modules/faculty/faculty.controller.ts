import httpStatus from "http-status";
import catchAsync from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";


const createFaculty = catchAsync(async (req, res) => {
  const result = await FacultyServices.createFaculty(req.body);
  sendResponse(res, {
    success: true,
    message: "Facility added successfully",
    data: result,
    statusCode:httpStatus.OK
  });
});
export const FacultyControllers={
    createFaculty
}