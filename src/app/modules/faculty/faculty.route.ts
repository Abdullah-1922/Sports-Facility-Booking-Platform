import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
const router =express.Router()

router.post('/',auth(USER_ROLE.admin),validateRequest(FacultyValidation.createFaculty),FacultyControllers.createFaculty)

export const FacultyRoute=router