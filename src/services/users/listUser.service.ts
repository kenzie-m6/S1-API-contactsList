import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserReturn } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

export const listUserService = async (userId: string): Promise<IUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository
  .createQueryBuilder("user")
  .leftJoinAndSelect("user.contacts", "contacts")
  .where({ id: userId })
  .getOne();
  const foundUser = returnUserSchema.parse(user);

  return foundUser;
};
