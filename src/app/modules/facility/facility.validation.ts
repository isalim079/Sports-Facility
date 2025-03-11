import { z } from "zod";

const facilityValidationSchema = z.object({
    body: z.object({
        name: z.string().nonempty({ message: "Name is required" }),
        description: z
            .string()
            .nonempty({ message: "Description is required" }),
        pricePerHour: z
            .number()
            .positive({ message: "Price per hour must be a positive number" }),
        location: z.string().nonempty({ message: "Location is required" }),
        isDeleted: z.boolean().optional().default(false),
    
    features: z
      .array(z.string().nonempty({ message: "Feature cannot be empty" }))
      .nonempty({ message: "At least one feature is required" }),
    operatingHours: z.string().nonempty({ message: "Operating hours are required" }),
    contactInfo: z.object({
      email: z.string().email({ message: "Invalid email address" }),
      phone: z.string().nonempty({ message: "Phone number is required" }),
    }),
    gallery: z
      .array(z.string().nonempty({ message: "Gallery image URL cannot be empty" }))
      .nonempty({ message: "At least one gallery image is required" }),
    }),
});

const updateFacilityValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z
      .number()
      .positive({ message: "Price per hour must be a positive number" })
      .optional(),
    image: z.string().optional(),
    facilityType: z.enum(["topFacility", "normalFacility"]).optional(),
    location: z.string().optional(),
    isDeleted: z.boolean().optional(),
    features: z
      .array(z.string().nonempty({ message: "Feature cannot be empty" }))
      .optional(),
    operatingHours: z.string().optional(),
    contactInfo: z
      .object({
        email: z.string().email({ message: "Invalid email address" }).optional(),
        phone: z.string().optional(),
      })
      .optional(),
    gallery: z
      .array(z.string().nonempty({ message: "Gallery image URL cannot be empty" }))
      .optional(),
    }),
});

export const FacilityValidation = {
    facilityValidationSchema,
    updateFacilityValidationSchema
};
