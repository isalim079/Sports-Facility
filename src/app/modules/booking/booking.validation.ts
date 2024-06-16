import { z } from "zod";

const bookingValidationSchema = z.object({
    body: z.object({
        facility: z.string().nonempty(),
        date: z.string().nonempty().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
        startTime: z.string().nonempty().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
        endTime: z.string().nonempty().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
    }),
});



export const BookingValidation = {
    bookingValidationSchema,
 
};
 