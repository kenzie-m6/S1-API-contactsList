import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { IContact } from "../../interfaces/contacts.interface";
import { manyContactsSchema } from "../../schemas/contacts.schema";

export const listContactsService = async (): Promise<any> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contacts: Array<Contact> = await contactRepository.find({
    relations: {
      user: true,
    },
  });

  const returnContacts = manyContactsSchema.parse(contacts);

  return returnContacts;
};
