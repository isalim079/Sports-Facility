import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    facility: { type: Schema.Types.ObjectId, ref: "Facility", required: true },
    payableAmount: { type: Number, required: true },
    isBooked: {
        type: String,
        enum: ["confirmed", "unconfirmed", "canceled"],
        required: true,
    },
    tnxId: { type: String },
});

// modified
bookingSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret
    }
})

export const Booking = model<TBooking>('Booking', bookingSchema)
