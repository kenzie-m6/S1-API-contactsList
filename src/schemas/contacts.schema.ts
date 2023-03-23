import {z} from "zod"

export const contactSchema = z.object({
    email: z.string().email().min(6).max(50),
    secondaryEmail: z.string().email().min(6).max(50).nullish(),
    profileImg: z.string().max(200).nullish(),
    fullName: z.string().min(3).max(50),
    phone: z.string().min(8).max(20),
    phoneSecondary: z.string().min(8).max(20).nullish(),
})

export const contactUpdateSchema = contactSchema.partial()

export const manyContactsSchema = contactSchema.extend({
    id: z.string().uuid(),
    createdAt: z.date()
}).array()

export const returnContactSchema = contactSchema.extend({
    id: z.string().uuid(),
    createdAt: z.date()
})