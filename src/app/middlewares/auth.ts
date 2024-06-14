import httpStatus from "http-status";
import AppError from "../Error/AppErrors";
import { TUserRole } from "../modules/User/user.interface";
import catchAsync from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/User/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    //check if the token is send from client
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route");
    }
    const token = authToken.replace("Bearer ", "");

    //check the token is valid

    const decode = jwt.verify(token, config.jwt_access_secret as string);

    const { email, role } = decode as JwtPayload;

    const user = User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    req.user = decode as JwtPayload;
    next();
  });
};
export default auth;
