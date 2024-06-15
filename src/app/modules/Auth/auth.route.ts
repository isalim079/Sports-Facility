import express from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { AuthValidation } from './auth.validations'
import { AuthControllers } from './auth.controller'
const router = express.Router()

router.post('/api/auth/login', validationRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser)

export const AuthRoutes = router