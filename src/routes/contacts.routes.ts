import { Router } from "express";
import { createContactController, listContactsController } from "../controllers/contacts.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { contactSchema } from "../schemas/contacts.schema";

 export const contactsRoutes: Router = Router()

 contactsRoutes.post("", ensureDataIsValidMiddleware(contactSchema), ensureTokenIsValidMiddleware, createContactController)
 contactsRoutes.get("", ensureTokenIsValidMiddleware, listContactsController)
 contactsRoutes.get("/:id", ensureTokenIsValidMiddleware, listContactsController)