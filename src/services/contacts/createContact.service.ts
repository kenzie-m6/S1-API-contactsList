import { AppDataSource } from "../../data-source"
import { Contact, User } from "../../entities"
import { IContact } from "../../interfaces/contacts.interface"
import { contactSchema } from "../../schemas/contacts.schema"

export const createContactService = async (userId: string, contactData: IContact) => {

    const userRepository = AppDataSource.getRepository(User)
    const contactRepository = AppDataSource.getRepository(Contact)

    const user: User = await userRepository.findOneBy({id: userId})

    const contact = contactRepository.create({
        ...contactData,
        user: user
    })
    await contactRepository.save(contact)

    const returnContact = contactSchema.parse(contact)

    return returnContact


}