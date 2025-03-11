import { Schema, model } from "mongoose";
import { TFacility } from "./facility.interface";

const facilitySchema = new Schema<TFacility>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    image: { type: String, required: true },
    facilityType: {type: String, enum: ["topFacility", "normalFacility"], default: "normalFacility"},
    location: { type: String, required: true }, 
    isDeleted: { type: Boolean, default: false },
    features: { type: [String], required: true }, 
    operatingHours: { type: String, required: true }, 
    contactInfo: {
      email: { type: String, required: true },
      phone: { type: String, required: true }, 
    },
    gallery: { type: [String], required: true },
  
});

// modified

facilitySchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret
    }
})

export const Facility = model<TFacility>('Facility', facilitySchema)
