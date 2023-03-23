import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { AppError } from "../../errors";
import { IContact } from "../../interfaces/contacts.interface";
import { returnContactSchema } from "../../schemas/contacts.schema";

export const listContactService = async (contactId: string, userId: string): Promise<IContact> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact: Contact | null = await contactRepository.findOneBy({
    id: contactId,
  });

  if (!contact) {
    throw new AppError("Contact not found", 400);
  }

  const returnContact = returnContactSchema.parse(contact);

  return returnContact;
};
