import {
  contactSchema,
  returnContactSchema,
  contactUpdateSchema,
} from "../schemas/contacts.schema";
import { z } from "zod";

export type IContact = z.infer<typeof contactSchema>;
export type IContactReturn = z.infer<typeof returnContactSchema>;
export type IContactUpdate = z.infer<typeof contactUpdateSchema>;
