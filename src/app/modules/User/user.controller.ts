import httpStatus from "http-status";
import catchAsync from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUser(req.body);
  sendResponse(res, {
    success: true,
    message: "USer created successfully",
    data: result,
    statusCode:httpStatus.OK
  });
});
export const UserControllers={
    createUser
}