import { Schema, model } from "mongoose";
import { TFacility } from "./facility.interface";

const facilitySchema = new Schema<TFacility>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    location: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
});

// modified

facilitySchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret
    }
})

export const Facility = model<TFacility>('Facility', facilitySchema)
