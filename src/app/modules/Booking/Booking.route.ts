import express from "express";

import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { BookingValidation } from "./booking.validation";
import { BookingControllers } from "./Booking.controller";

const router = express.Router();

// router.get("/", FacilityControllers.getAllFacilities);

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.createBooking),
BookingControllers.createBooking
);
// router.put(
//   "/:id",
//   auth(USER_ROLE.admin),
//   validateRequest(FacilityValidation.updateFacilityValidation),
//   FacilityControllers.updateFacility
// );
// router.delete(
//   "/:id",
//   auth(USER_ROLE.admin),
//   FacilityControllers.deleteFacility
// );

export const BookingRoute = router;
