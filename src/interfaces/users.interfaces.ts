import {returnUserSchema, userSchema, userUpdateSchema} from "../schemas/users.schemas"
import {z} from "zod"

export type IUser = z.infer<typeof userSchema>
export type IUserReturn = z.infer<typeof returnUserSchema>
export type IUserUpdate = z.infer<typeof userUpdateSchema>