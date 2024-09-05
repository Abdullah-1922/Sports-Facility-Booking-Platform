import httpStatus from "http-status";
import AppError from "../../Error/AppErrors";

import { Facility } from "./facility.model";
import { TFacility } from "./facility.interface";
import QueryBuilder from "../../builder/QueryBuilder";

const createFacility = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};
const updateFacility = async (id: string, payload: Partial<TFacility>) => {
  const facility = await Facility.findById(id);

  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  const result = await Facility.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteFacility = async (id: string) => {
  const facility = await Facility.findById(id);

  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

const getAllFacilities = async (query: Record<string, unknown>) => {
  const facilityQuery = new QueryBuilder(Facility.find(), query)
    .search(["name", "location"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facilityQuery.modelQuery.exec();

  // console.log(result);
  const meta = await facilityQuery.countTotal();
  return { result, meta };
};

const getSingleFacility = async (id: string) => {
  const result = await Facility.findById(id);
  return result;
};

export const FacilityServices = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacilities,
  getSingleFacility,
};
