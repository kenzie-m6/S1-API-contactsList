import { z } from "zod";
import { hashSync } from "bcryptjs";

export const userSchema = z.object({
    email: z.string().email("invalid e-mail").min(6).max(50),
    secondaryEmail: z.string().email().min(6).max(50).nullable(),
    password: z.string().min(4).max(20).transform((pass)=> {
        return hashSync(pass,10)
    }),
    profileImg: z.string().max(200).nullable(),
    fullName: z.string().min(3).max(50),
    phone: z.string().min(8).max(20),
    phoneSecondary: z.string().min(8).max(20).nullable(),
})

export const userUpdateSchema = userSchema.partial()

export const returnUserSchema = userSchema.extend({
    id: z.string().uuid(),
    createdAt: z.date(),
    deletedAt: z.date()
}).omit({password: true})