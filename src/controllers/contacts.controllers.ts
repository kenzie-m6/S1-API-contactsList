import { Request, Response } from "express";
import { Contact } from "../entities";
import { IContact } from "../interfaces/contacts.interface";
import { createContactService } from "../services/contacts/createContact.service";
import { listContactsService } from "../services/contacts/listContacts.service";

export const createContactController = async (req:Request, res:Response): Promise<Response> => {
    const userId: string = req["user"].id
    const contactData: IContact = req["body"]

    const newContact = await createContactService(userId, contactData)

    return res.status(201).json(newContact)
}

export const listContactsController = async (req:Request, res:Response): Promise<Response> => {
    const contacts = await listContactsService()

    return res.json(contacts)
}