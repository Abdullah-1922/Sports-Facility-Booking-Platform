import { Schema, model } from "mongoose";
import { TFaculty } from "./faculty.interface";

const facultySchema=new Schema<TFaculty>({
    name:{type:String,required:true},
    description:{type:String,required:true},
    pricePerHour:{type:Number,required:true},
    location:{type:String,required:true},
    isDeleted:{type:Boolean,required:true,default:false},
},{versionKey:false})

export const Faculty= model<TFaculty>('Faculty',facultySchema)