import { z } from "zod";

const loginValidation=z.object({
 body:z.object({
    email:z.string({required_error:"Email is required"}).email({message:"Input must be an email"}),
    password:z.string({required_error:"Password is required"})

 })
})
export const authValidation={
    loginValidation
}