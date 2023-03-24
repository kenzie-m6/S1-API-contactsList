import { ILogin } from "../../../interfaces/login.interfaces";
import { mockedCreatedUser } from "./user.mocks";

export const mockedLoginRequest: ILogin = {
    email: mockedCreatedUser.email,
    password: mockedCreatedUser.password
}

export const mockedToUpdateLoginRequest: ILogin = {
    email: "user_to_update@email.com",
    password: "1234"
}

export const mockedUnregisteredCredentialsLoginRequest: ILogin = {
    email: "invalid@email.com",
    password: "12345"
}