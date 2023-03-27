import request from "supertest";
import { app } from "../../../app";
import { mockedLoginRequest, mockedToUpdateLoginRequest } from "./login.mocks";
import { mockedCreatedToUpdateUser } from "./user.mocks";

export const token = async () => {
  const userLoginResponse = await request(app)
    .post("/login")
    .send(mockedLoginRequest);

    return `Bearer ${userLoginResponse.body.token}`
};
export const updateUserToken = async () => {
  await request(app).post("/users").send(mockedCreatedToUpdateUser);
  const userLoginResponse = await request(app)
    .post("/login")
    .send(mockedToUpdateLoginRequest);

    return `Bearer ${userLoginResponse.body.token}`
};
