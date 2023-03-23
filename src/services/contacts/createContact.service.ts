import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact, User } from "../../entities";
import { AppError } from "../../errors";
import { IContact } from "../../interfaces/contacts.interface";
import { returnContactSchema } from "../../schemas/contacts.schema";

export const createContactService = async (
  userId: string,
  contactData: IContact
) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const contactRepository = AppDataSource.getRepository(Contact);

  const contactAlreadyExist = await contactRepository.findOneBy({
    email: contactData.email,
  });

  if (contactAlreadyExist) {
    throw new AppError("Contact already exists", 409);
  }

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const contact = contactRepository.create({
    ...contactData,
    user: user,
  });
  await contactRepository.save(contact);

  const returnContact = returnContactSchema.parse(contact);

  return returnContact;
};
