import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import {
  IContactReturn,
  IContactUpdate,
} from "../../interfaces/contacts.interface";
import { returnContactSchema } from "../../schemas/contacts.schema";

export const updateContactService = async (
    contactData: any, contactId: string
): Promise<IContactReturn> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contactToUpdate = await contactRepository.findOneBy({ id: contactId });

  const updatedContact = contactRepository.create({
    ...contactToUpdate,
    ...contactData,
  })

  await contactRepository.save(updatedContact)
  const returnUpdatedContact = returnContactSchema.parse(updatedContact)

  return returnUpdatedContact
};
