import express from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validationRequest from "../../middlewares/validationRequest";
import { BookingValidation } from "./booking.validation";
const router = express.Router();

router.post(
    "/api/bookings",
    auth(USER_ROLE.user),
    validationRequest(BookingValidation.bookingValidationSchema),
    BookingController.createBookingIntoDB
);

router.get(
    "/api/check-availability",
    BookingController.checkAvailabilityFromDB
);

router.get(
    "/api/bookings",
    auth(USER_ROLE.admin),
    BookingController.getAllBookingsFromDB
);

router.get(
    "/api/bookings/user",
    auth(USER_ROLE.user),
    BookingController.getAllBookingsFromDBForUser
);

router.delete(
    "/api/bookings/:id",
    auth(USER_ROLE.user),
    BookingController.deleteBookingFromDB
);

export const BookingRoutes = router;
