import express from 'express'
import { BookingController } from './booking.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
import validationRequest from '../../middlewares/validationRequest'
import { BookingValidation } from './booking.validation'
const router = express.Router()

router.post('/api/bookings', auth(USER_ROLE.user), validationRequest(BookingValidation.bookingValidationSchema), BookingController.createBookingIntoDB)

router.get('/api/check-availability', BookingController.checkAvailabilityFromDB)

export const BookingRoutes = router