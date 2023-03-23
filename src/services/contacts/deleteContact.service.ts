import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";

export const deleteContactService = async (contactId: string): Promise<void> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
  await contactRepository.delete({id: contactId});
};
