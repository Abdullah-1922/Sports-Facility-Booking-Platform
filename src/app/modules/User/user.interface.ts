/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
name:string;
email:string;
password:string;
phone:string;
role: "admin"| "user";
address:string
}

export type TUserRole=keyof typeof USER_ROLE

export  interface UserModel extends Model<TUser>{
    isUserExistsByEmail(email:string):Promise<TUser>
}