import request from "supertest";
import { app } from "../../../app";
import { mockedLoginRequest } from "./login.mocks";

export const token = async () => {
  const userLoginResponse = await request(app)
    .post("/login")
    .send(mockedLoginRequest);

    return `Bearer ${userLoginResponse.body.token}`
};
