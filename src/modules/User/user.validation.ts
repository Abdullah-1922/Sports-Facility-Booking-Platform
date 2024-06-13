import { z } from "zod";

const createUserValidation=z.object({
    body:z.object({
        name:z.string({required_error:"Name is required"}),
        email:z.string({required_error:"Email is required"}).email({message:"Input a valid email"}),
        password:z.string({required_error:"Password is required"}),
        phone:z.string({required_error:"Phone number is required"}),
        role:z.enum(["user","admin"],{message:"{VALUE} is not acceptable. Value should be user | admin  "}),
        address:z.string({required_error:"Name is required"}),
    })
})
export const userValidation ={
    createUserValidation
}