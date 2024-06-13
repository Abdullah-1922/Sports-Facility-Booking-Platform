import express from 'express';
import { authControllers } from './auth.controller';

const router =express.Router()


router.post('/signup',authControllers.signUp)
router.post('/login',authControllers.login)

export const AuthRoute=router