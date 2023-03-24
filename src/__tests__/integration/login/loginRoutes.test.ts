import { DataSource } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedCreatedUser } from "../../mocks/integration/user.mocks";
import request from "supertest";
import { mockedLoginRequest } from "../../mocks/integration/login.mocks";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => connection = res )
      .catch((err) => { console.error("Error during initialization", err) });

    await request(app).post("/users").send(mockedCreatedUser);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login -> Should be able to login", async () => {
    const response = await request(app).post("/login").send(mockedLoginRequest);
    expect(response.body).toHaveProperty("token");
    expect(response.statusCode).toBe(200);
  });
});