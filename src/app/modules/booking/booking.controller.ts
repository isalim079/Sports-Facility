import moment from "moment";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createBookingIntoDB = catchAsync(async (req, res) => {
    const userId = req.user.id
    const result = await BookingServices.createBookingIntoDB(userId, req.body)

     // modified
     const formattedResult = {
            _id: result._id,
            facility: result.facility,
            date: moment(result.date).format('YYYY-MM-DD'),
            startTime: result.startTime,
            endTime: result.endTime,
            user: result.user,
            payableAmount: result.payableAmount,
            isBooked: result.isBooked
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking created successfully',
        data: formattedResult
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

     // modified
     const formattedResult = result.map(booking => ({
        _id: booking._id,
        facility: booking.facility,
        date: moment(booking.date).format('YYYY-MM-DD'),
        startTime: booking.startTime,
        endTime: booking.endTime,
        user: booking.user,
        payableAmount: booking.payableAmount,
        isBooked: booking.isBooked
    }));

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: formattedResult
    })
})

const getAllBookingsFromDBForUser = catchAsync(async(req, res) => {
    const userId = req.user.id
    const result = await BookingServices.getAllBookingsFromDBForUser(userId)

    // modified
    const formattedResult = result.map(booking => ({
        _id: booking._id,
        facility: booking.facility,
        date: moment(booking.date).format('YYYY-MM-DD'),
        startTime: booking.startTime,
        endTime: booking.endTime,
        user: booking.user,
        payableAmount: booking.payableAmount,
        isBooked: booking.isBooked
    }));

    if (result.length === 0) {
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "No Data Found",
            data: formattedResult,
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: formattedResult
    })
})

const deleteBookingFromDB = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await BookingServices.deleteBookingsFromDB(id)

    // modified
    const formattedResult = {
        _id: result?._id,
        facility: result?.facility,
        date: moment(result?.date).format('YYYY-MM-DD'),
        startTime: result?.startTime,
        endTime: result?.endTime,
        user: result?.user,
        payableAmount: result?.payableAmount,
        isBooked: result?.isBooked
    };

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking cancelled successfully",
        data: formattedResult
    })
})



export const BookingController = {
    createBookingIntoDB,
    checkAvailabilityFromDB,
    getAllBookingsFromDB,
    getAllBookingsFromDBForUser,
    deleteBookingFromDB
}