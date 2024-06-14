import { TFaculty } from "./faculty.interface"
import { Faculty } from "./faculty.model"


const createFaculty=async(payload:TFaculty)=>{
    const result =await Faculty.create(payload)
    return result
}

export const FacultyServices={
    createFaculty
}