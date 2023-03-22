import {z} from "zod"

export const contactSchema = z.object({
    email: z.string().email().min(6).max(50),
    secondaryEmail: z.string().email().min(6).max(50).nullable(),
    profileImg: z.string().max(200).nullable(),
    fullName: z.string().min(3).max(50),
    phone: z.string().min(8).max(20),
    phoneSecondary: z.string().min(8).max(20).nullable(),
})

export const contactUpdateSchema = contactSchema.partial()

export const manyContactsSchema = contactSchema.array()

export const returnContactSchema = contactSchema.extend({
    id: z.string().uuid(),
    createdAt: z.date()
})