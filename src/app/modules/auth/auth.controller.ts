import httpStatus from "http-status";
import catchAsync from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const signUp = catchAsync(async (req, res) => {
  const result = await authServices.signUp(req.body);
  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    data: result,
    statusCode: httpStatus.OK,
  });
});
const login = catchAsync(async (req, res) => {
  const result = await authServices.login(req.body);
  sendResponse(res, {
    success: true,
    message: "User logged in successfully",
    token: result.token,
    data: result.user,
    statusCode: httpStatus.OK,
  });
});
export const authControllers = {
  signUp,
  login,
};
