import { Router } from "express";
import { createUserController, deleteUserController, listUserController, updateUserController } from "../controllers/users.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { userSchema, userUpdateSchema } from "../schemas/users.schemas";

export const userRoutes: Router = Router()

userRoutes.post("", ensureDataIsValidMiddleware(userSchema), createUserController)
userRoutes.get("", ensureTokenIsValidMiddleware, listUserController)
userRoutes.delete("", ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, deleteUserController)
userRoutes.patch("", ensureTokenIsValidMiddleware, ensureDataIsValidMiddleware(userUpdateSchema), ensureUserExistsMiddleware, updateUserController)