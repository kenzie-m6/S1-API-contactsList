import { z } from "zod";
import { hashSync } from "bcryptjs";
import { manyContactsSchema } from "./contacts.schema";

export const userSchema = z.object({
  email: z.string().email("Invalid e-mail format").min(6).max(50),
  secondaryEmail: z.string().email().min(6).max(50).nullish(),
  password: z
    .string()
    .min(4, "Password need to be at least 4 characters")
    .max(20)
    .transform((pass) => {
      return hashSync(pass, 10);
    }),
  profileImg: z.string().max(200).nullish(),
  fullName: z.string().min(3).max(50),
  phone: z.string().min(8).max(20),
  phoneSecondary: z.string().min(8).max(20).nullish(),
});

export const userUpdateSchema = userSchema.partial();

export const returnUserSchema = userSchema
  .extend({
    id: z.string().uuid(),
    createdAt: z.date(),
    deletedAt: z.date().nullable(),
    contacts: manyContactsSchema.optional(),
  })
  .omit({ password: true });
