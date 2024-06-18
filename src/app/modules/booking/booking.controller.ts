import moment from "moment";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createBookingIntoDB = catchAsync(async (req, res) => {
    const userId = req.user.id
    const result = await BookingServices.createBookingIntoDB(userId, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking created successfully',
        data: result
    })

})

const checkAvailabilityFromDB = catchAsync(async (req, res) => {
    const date = req.query.date ? String(req.query.date): moment().format('YYYY-MM-DD')

    const result = await BookingServices.checkAvailabilityFromDB(date)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Availability checked successfully',
        data: result
    })
})

const getAllBookingsFromDB = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingsFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: result
    })
})

const getAllBookingsFromDBForUser = catchAsync(async(req, res) => {
    const userId = req.user.id
    const result = await BookingServices.getAllBookingsFromDBForUser(userId)
    console.log(userId);
    console.log(result);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: result
    })
})



export const BookingController = {
    createBookingIntoDB,
    checkAvailabilityFromDB,
    getAllBookingsFromDB,
    getAllBookingsFromDBForUser,
}