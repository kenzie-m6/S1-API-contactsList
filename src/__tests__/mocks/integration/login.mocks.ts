import { ILogin } from "../../../interfaces/login.interfaces";
import { mockedCreatedToUpdateUser, mockedCreatedUser } from "./user.mocks";

export const mockedLoginRequest: ILogin = {
    email: mockedCreatedUser.email,
    password: mockedCreatedUser.password
}

export const mockedToUpdateLoginRequest: ILogin = {
    email: mockedCreatedToUpdateUser.email,
    password: mockedCreatedToUpdateUser.password
}

export const mockedUnregisteredCredentialsLoginRequest: ILogin = {
    email: "invalid@email.com",
    password: "12345"
}