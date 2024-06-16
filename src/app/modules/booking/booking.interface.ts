import { Schema } from "mongoose";

export type TBooking = {
    date: Date;
    startTime: string;
    endTime: string;
    user: Schema.Types.ObjectId;
    facility: Schema.Types.ObjectId;
    payableAmount: number;
    isBooked: 'confirmed' | 'unconfirmed' | 'canceled'
}

export type TTimeSlot = {
    startTime: string;
    endTime: string;
}
