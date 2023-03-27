import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { IContact } from "../../interfaces/contacts.interface";
import { manyContactsSchema } from "../../schemas/contacts.schema";

export const listContactsService = async (
  userId: string
): Promise<IContact[]> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contacts: Array<Contact> = await contactRepository
    .createQueryBuilder("contacts")
    .where("contacts.userId = :userId", { userId: userId })
    .getMany();

  const returnContacts = manyContactsSchema.parse(contacts);

  return returnContacts;
};
