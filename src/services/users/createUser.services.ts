import { IUser, IUserReturn } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { returnUserSchema } from "../../schemas/users.schemas";
import { AppError } from "../../errors";

export const createUserService = async (
  userData: IUser
): Promise<IUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userAlreadyExists = await userRepository.findOneBy({
    email: userData.email,
  });

  if (userAlreadyExists) {
    throw new AppError("User already exists", 409);
  }

  const user = userRepository.create(userData);

  await userRepository.save(user);

  const newUser = returnUserSchema.parse(user);

  return newUser;
};
