import moment from "moment";
import { Booking } from "./booking.model";
import { BOOKING_INFO } from "./booking.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TBooking } from "./booking.interface";
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

    const formattedStartTime = moment(startDateTime).format("HH:mm");
    const formattedEndTime = moment(endDateTime).format("HH:mm");

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
    const queryDate = date ? moment(date, "YYYY-MM-DD").toDate() : new Date();

    const bookings = await Booking.find({
        date: queryDate,
        isBooked: "confirmed",
    });

    const totalSlots = [{ startTime: "00:00", endTime: "24:00" }];

    bookings.forEach((booking) => {
        const bookedStart = moment(booking.startTime, "HH:mm");
        const bookedEnd = moment(booking.endTime, "HH:mm");
        const newSlots: { startTime: string; endTime: string }[] = [];

        totalSlots.forEach((slot) => {
            const slotStart = moment(slot.startTime, "HH:mm");
            const slotEnd = moment(slot.endTime, "HH:mm");

            if (
                bookedStart.isAfter(slotStart) &&
                bookedStart.isBefore(slotEnd)
            ) {
                newSlots.push({
                    startTime: slot.startTime,
                    endTime: bookedStart.format("HH:mm"),
                });
            }
            if (bookedEnd.isAfter(slotStart) && bookedEnd.isBefore(slotEnd)) {
                newSlots.push({
                    startTime: bookedEnd.format("HH:mm"),
                    endTime: slot.endTime,
                });
            }
            if (
                !(
                    bookedStart.isSameOrAfter(slotEnd) ||
                    bookedEnd.isSameOrBefore(slotStart)
                )
            ) {
                if (
                    bookedStart.isSameOrBefore(slotStart) &&
                    bookedEnd.isSameOrAfter(slotEnd)
                ) {
                    newSlots.push({
                        startTime: slot.startTime,
                        endTime: slot.startTime,
                    });
                }
            }
        });

        totalSlots.splice(0, totalSlots.length, ...newSlots);
    });

    const availableSlots = totalSlots.filter((slot) =>
        moment(slot.startTime, "HH:mm").isBefore(moment(slot.endTime, "HH:mm"))
    );

    return availableSlots;
};

const getAllBookingsFromDB = async () => {
    const result = await Booking.find().populate("user").populate("facility");      // modified
    return result;
};

const getAllBookingsFromDBForUser = async (userId: Types.ObjectId) => {
    const bookings = await Booking.find({ user: userId }).populate("facility");
    return bookings;
};

const deleteBookingsFromDB = async (id: string) => {
    const result = await Booking.findByIdAndUpdate(
        { _id: id },
        { isBooked: BOOKING_INFO.canceled },
        { new: true }
    ).populate("facility");
    return result;
};

export const BookingServices = {
    createBookingIntoDB,
    checkAvailabilityFromDB,
    getAllBookingsFromDB,
    getAllBookingsFromDBForUser,
    deleteBookingsFromDB,
};
