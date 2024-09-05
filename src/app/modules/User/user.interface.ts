/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  _id: Types.ObjectId;

  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
  image:string
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
}
