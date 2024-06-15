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
    }),
});

export const FacilityValidation = {
    facilityValidationSchema,
};
