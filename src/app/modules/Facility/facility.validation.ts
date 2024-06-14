import { z } from "zod";

const createFacilityValidation=z.object({
    body:z.object({
        name:z.string({required_error:"Name is required !"}),
        description:z.string({required_error:"Description is required !"}),
        pricePerHour:z.number({required_error:"PricePerHour is required !"}),
        location:z.string({required_error:"Location is required !"}),
    })
})
const updateFacilityValidation=z.object({
    body:z.object({
        name:z.string({required_error:"Name is required !"}).optional(),
        description:z.string({required_error:"Description is required !"}).optional(),
        pricePerHour:z.number({required_error:"PricePerHour is required !"}).optional(),
        location:z.string({required_error:"Location is required !"}).optional(),
    })
})

export const FacilityValidation={
    createFacilityValidation,
    updateFacilityValidation
}
