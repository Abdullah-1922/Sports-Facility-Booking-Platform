
import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";
const userSchema= new Schema<TUser,UserModel>({
name:{type:String,required:true},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
phone:{type:String,required:true},
role:{type:String,required:true,enum:{values:["user","admin"],message:"{VALUE} is not acceptable ."},},
address:{type:String,required:true},
},{versionKey:false})


userSchema.pre("save", async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; //doc
  
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
    next();
  });

  
  
userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  };


  userSchema.statics.isUserExistsByEmail=async function(email:string){
   return await User.findOne({email})
  }
  


export const User = model<TUser,UserModel>("User",userSchema)