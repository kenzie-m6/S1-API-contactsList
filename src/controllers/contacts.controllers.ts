import { Request, Response } from "express";
import { IContact } from "../interfaces/contacts.interface";
import { createContactService } from "../services/contacts/createContact.service";
import { listContactService } from "../services/contacts/listContact.service";
import { listContactsService } from "../services/contacts/listContacts.service";
import { updateContactService } from "../services/contacts/updateContact.service";

export const createContactController = async (req:Request, res:Response): Promise<Response> => {
    const userId: string = req.user.id
    const contactData: IContact = req.body

    const newContact = await createContactService(userId, contactData)

    return res.status(201).json(newContact)
}

export const listContactsController = async (req:Request, res:Response): Promise<Response> => {
    const userId: string = req.user.id
    const contacts = await listContactsService(userId)

    return res.json(contacts)
}

export const listContactController = async (req:Request, res:Response): Promise<Response> => {
    const contactId:string = req.params.id
    const contact = await listContactService(contactId)

    return res.json(contact)
}

export const updateContactController = async (req: Request, res:Response): Promise<Response> => {
    const contactId: string = req.params.id
    const contactData = req.body
    const updatedContact = await updateContactService(contactData, contactId)

    return res.json(updatedContact)


}