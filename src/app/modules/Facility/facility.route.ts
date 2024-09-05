import express from "express";

import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { FacilityControllers } from "./facility.controller";
import { FacilityValidation } from "./facility.validation";
const router = express.Router();

router.get("/", FacilityControllers.getAllFacilities);
router.get("/:id", FacilityControllers.getSingleFacility);

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidation.createFacilityValidation),
  FacilityControllers.createFacility
);
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidation.updateFacilityValidation),
  FacilityControllers.updateFacility
);
router.delete(
  "/:id",
  auth(USER_ROLE.admin),
  FacilityControllers.deleteFacility
);

export const FacilityRoute = router;
