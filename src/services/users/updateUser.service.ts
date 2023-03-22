import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserReturn, IUserUpdate } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

export const updateUserService = async (userData: IUserUpdate, userId: string): Promise<IUserReturn> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const oldUser = await userRepository.findOneBy({id: userId})

    const nUserData = userRepository.create({
        ...oldUser,
        ...userData
    })

    await userRepository.save(nUserData)

    const updatedUser = returnUserSchema.parse(nUserData)

    return updatedUser

}