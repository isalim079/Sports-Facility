import { z } from "zod";

const userValidationSchema = z.object({
    body: z.object({
        name: z.string().nonempty({
            message: "Name is required",
        }),
        email: z.string().email({
            message: "Invalid email address",
        }),
        password: z.string({
            invalid_type_error: "Password must be a string",
        }),
        phone: z.string().nonempty({
            message: "Phone number is required",
        }),
        role: z.enum(["admin", "user"]),
        address: z.string().nonempty({
            message: "Address is required",
        }),
    }),
});

export const UserValidation = {
    userValidationSchema,
};
