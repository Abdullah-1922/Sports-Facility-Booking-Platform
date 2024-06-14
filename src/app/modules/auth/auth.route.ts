import express from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "../User/user.validation";
import { authValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.createUserValidation),
  authControllers.signUp
);
router.post(
  "/login",
  validateRequest(authValidation.loginValidation),
  authControllers.login
);

export const AuthRoute = router;
