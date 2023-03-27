import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { IContact } from "../../interfaces/contacts.interface";
import { returnContactSchema } from "../../schemas/contacts.schema";

export const listContactService = async (
  contactId: string
): Promise<IContact> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact: Contact | null = await contactRepository.findOneBy({
    id: contactId,
  });

  const returnContact = returnContactSchema.parse(contact);

  return returnContact;
};
