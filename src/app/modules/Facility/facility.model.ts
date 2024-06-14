import { Schema, model } from "mongoose";
import { TFacility } from "./facility.interface";

const facilitySchema = new Schema<TFacility>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    location: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { versionKey: false }
);

// facilitySchema.post("find", function (docs,next) {
// //   docs.filter((data: TFacility) => data.isDeleted !== true);
//   const filteredDocs = docs.filter((data: TFacility) => !data.isDeleted);
//   docs.splice(0, docs.length, ...filteredDocs);

//   next()
// });
facilitySchema.pre("find", function (next) {
  // console.log('from this',this.find({}));
  this.find({ isDeleted: { $ne: true } });

  next();
});
facilitySchema.pre("findOne", function (next) {
  // console.log('from this',this);
  this.findOne({ isDeleted: { $ne: true } });
  next();
});
facilitySchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

export const Facility = model<TFacility>("Facility", facilitySchema);
