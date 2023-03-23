import { Router } from "express";
import { createContactController, listContactController, listContactsController } from "../controllers/contacts.controllers";
import { ensureContactExistsMiddleware } from "../middlewares/ensureContactExist.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserIsOwnerMiddleware } from "../middlewares/ensureUserIsContactOwner.service";
import { contactSchema } from "../schemas/contacts.schema";

 export const contactsRoutes: Router = Router()

 contactsRoutes.post("", ensureDataIsValidMiddleware(contactSchema), ensureTokenIsValidMiddleware, createContactController)
 contactsRoutes.get("", ensureTokenIsValidMiddleware, listContactsController)
 contactsRoutes.get("/:id", ensureTokenIsValidMiddleware, ensureContactExistsMiddleware, ensureUserIsOwnerMiddleware, listContactController)