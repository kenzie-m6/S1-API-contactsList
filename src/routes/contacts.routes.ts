import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  listContactController,
  listContactsController,
  updateContactController,
} from "../controllers/contacts.controllers";
import { ensureContactExistsMiddleware } from "../middlewares/ensureContactExist.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserIsOwnerMiddleware } from "../middlewares/ensureUserIsContactOwner.middleware";
import { ensureValidUuidMiddleware } from "../middlewares/ensureValidUuid.middleware";
import { contactSchema } from "../schemas/contacts.schema";
import { uuidSchema } from "../schemas/uuid.schema";

export const contactsRoutes: Router = Router();

contactsRoutes.post(
  "",
  ensureDataIsValidMiddleware(contactSchema),
  ensureTokenIsValidMiddleware,
  createContactController
);
contactsRoutes.get("", ensureTokenIsValidMiddleware, listContactsController);
contactsRoutes.get(
  "/:id",
  ensureValidUuidMiddleware(uuidSchema),
  ensureTokenIsValidMiddleware,
  ensureContactExistsMiddleware,
  ensureUserIsOwnerMiddleware,
  listContactController
);
contactsRoutes.patch(
  "/:id",
  ensureValidUuidMiddleware(uuidSchema),
  ensureTokenIsValidMiddleware,
  ensureContactExistsMiddleware,
  ensureUserIsOwnerMiddleware,
  updateContactController
);
contactsRoutes.delete(
  "/:id",
  ensureValidUuidMiddleware(uuidSchema),
  ensureTokenIsValidMiddleware,
  ensureContactExistsMiddleware,
  ensureUserIsOwnerMiddleware,
  deleteContactController
);
