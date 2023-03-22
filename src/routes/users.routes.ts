import { Router } from "express";
import { createUserController, deleteUserController, updateUserController } from "../controllers/users.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { userSchema, userUpdateSchema } from "../schemas/users.schemas";

export const userRoutes: Router = Router()

userRoutes.post("", ensureDataIsValidMiddleware(userSchema), createUserController)
userRoutes.delete("/:id", ensureUserExistsMiddleware, deleteUserController)
userRoutes.patch("/:id", ensureDataIsValidMiddleware(userUpdateSchema), ensureUserExistsMiddleware, updateUserController)