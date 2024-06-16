import moment from "moment";
import { Booking } from "./booking.model";
import { BOOKING_INFO } from "./booking.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TBooking, TTimeSlot } from "./booking.interface";
import { Types } from "mongoose";
import { Facility } from "../facility/facility.model";

const createBookingIntoDB = async (
    userId: Types.ObjectId,
    payload: TBooking
) => {
    const bookingDate = moment(payload?.date, "YYYY-MM-DD")
        .startOf("day")
        .toDate();
    const startDateTime = moment(
        `${payload?.date} ${payload?.startTime}`,
        "YYYY-MM-DD HH:mm"
    ).toDate();
    const endDateTime = moment(
        `${payload?.date} ${payload?.endTime}`,
        "YYYY-MM-DD HH:mm"
    ).toDate();

    // check facility availability
    const existingBookings = await Booking.find({
        facility: payload?.facility,
        date: {
            $gte: bookingDate,
            $lt: moment(bookingDate).endOf("day").toDate(),
        },
        isBooked: BOOKING_INFO.confirmed,
    });

    for (const booking of existingBookings) {
        const bookedStart = moment(booking.startTime).toDate();
        const bookedEnd = moment(booking.endTime).toDate();

        if (
            (startDateTime >= bookedStart && startDateTime < bookedEnd) ||
            (endDateTime > bookedStart && endDateTime <= bookedEnd) ||
            (startDateTime < bookedStart && endDateTime > bookedEnd)
        ) {
            throw new AppError(
                httpStatus.CONFLICT,
                "The facility is not available"
            );
        }
    }

    // Calculate payable amount
    const facilityDetails = await Facility.findById(payload?.facility);
    if (!facilityDetails) {
        throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
    }
    const durationInHours = moment(endDateTime).diff(
        moment(startDateTime),
        "hours",
        true
    );
    const payableAmount = durationInHours * facilityDetails.pricePerHour;

    const formattedStartTime = moment(startDateTime).format('HH:mm');
    const formattedEndTime = moment(endDateTime).format('HH:mm');

    // Create booking
    const newBooking = await Booking.create({
        user: userId,
        facility: payload?.facility,
        date: bookingDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        payableAmount,
        isBooked: BOOKING_INFO.confirmed,
    });

    return newBooking;
};

const checkAvailabilityFromDB = async (date: string) => {
    const bookingDate = moment(date, "YYYY-MM-DD").startOf("day").toDate();

    const bookings = await Booking.find({
        date: {
            $gte: bookingDate,
            $lt: moment(bookingDate).endOf("day").toDate(),
        },
        isBooked: BOOKING_INFO.confirmed,
    });

    const totalSlots = [
        {
            startTime: "00:00",
            endTime: "24:00",
        },
    ];

    bookings.forEach((booking) => {
        const bookingStartTime = moment(booking.startTime).format("HH:mm");
        const bookingEndTime = moment(booking.endTime).format("HH:mm");

        const newSlots: TTimeSlot[] = [];

        totalSlots.forEach((slot) => {
            if (
                bookingStartTime > slot.startTime &&
                bookingEndTime < slot.endTime
            ) {
                newSlots.push({
                    startTime: slot.startTime,
                    endTime: bookingStartTime,
                });
                newSlots.push({
                    startTime: bookingEndTime,
                    endTime: slot.endTime,
                });
            } else if (
                bookingStartTime <= slot.startTime &&
                bookingEndTime >= slot.endTime
            ) {
                throw new AppError(
                    httpStatus.CONFLICT,
                    "Already booked. no slot can be added"
                );
            } else if (
                bookingStartTime <= slot.startTime &&
                bookingEndTime > slot.startTime &&
                bookingEndTime < slot.endTime
            ) {
                newSlots.push({
                    startTime: bookingEndTime,
                    endTime: slot.endTime,
                });
            } else if (
                bookingStartTime > slot.startTime &&
                bookingStartTime < slot.endTime &&
                bookingEndTime >= slot.endTime
            ) {
                newSlots.push({
                    startTime: slot.startTime,
                    endTime: bookingStartTime,
                });
            } else {
                newSlots.push(slot);
            }
        });

        totalSlots.length = 0;
        newSlots.forEach((slot) => totalSlots.push(slot));
    });

    return totalSlots;
};

export const BookingServices = {
    createBookingIntoDB,
    checkAvailabilityFromDB,
};
