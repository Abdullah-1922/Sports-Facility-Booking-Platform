import httpStatus from "http-status";
import catchAsync from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { FacilityServices } from "./facility.service";

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.createFacility(req.body);

  sendResponse(res, {
    success: true,
    message: "Facility added successfully",
    data: result,
    statusCode: httpStatus.OK,
  });
});
const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FacilityServices.updateFacility(id, req.body);
  sendResponse(res, {
    success: true,
    message: "Facility updated successfully",
    data: result,
    statusCode: httpStatus.OK,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FacilityServices.deleteFacility(id);
  sendResponse(res, {
    success: true,
    message: "Facility deleted successfully",
    data: result,
    statusCode: httpStatus.OK,
  });
});

const getAllFacilities = catchAsync(async (req, res) => {
  const result = await FacilityServices.getAllFacilities(req.query);
  sendResponse(res, {
    success: true,
    message: "Facilities retrieved successfully",
    data: result.result,
    meta: result.meta,
    statusCode: httpStatus.OK,
    
  });
});
const getSingleFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.getSingleFacility(req.params.id);
  sendResponse(res, {
    success: true,
    message: "Facilities retrieved successfully",
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacilities,
  getSingleFacility,
};
