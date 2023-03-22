import { Router } from "express";
 import { createContactController, listContactsController } from "../controllers/contacts.controllers";

export const contactsRoutes: Router = Router()

contactsRoutes.post("", createContactController)
contactsRoutes.post("", listContactsController)