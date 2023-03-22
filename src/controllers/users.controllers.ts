import {Request, Response} from "express"
import { IUser, IUserUpdate } from "../interfaces/users.interfaces"
import { createUserService } from "../services/users/createUser.services"
import { deleteUserServive } from "../services/users/deleteUser.service"
import { updateUserService } from "../services/users/updateUser.service"

export const createUserController = async (req: Request, res: Response) => {

    const userData: IUser = req["body"]

    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)
}

export const deleteUserController = async (req: Request, res:Response) => {
    const userId: string = req.params.id

    await deleteUserServive(userId)

    return res.status(204).send(null)
}

export const updateUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.id
    const nUserData: IUserUpdate = req["body"]

    const updatedUser = await updateUserService(nUserData, userId)

    return res.json(updatedUser)
}