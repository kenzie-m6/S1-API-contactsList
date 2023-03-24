import { DataSource } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedCreatedUser } from "../../mocks/integration/user.mocks";
import request from "supertest";
import { mockedLoginRequest, mockedUnregisteredCredentialsLoginRequest } from "../../mocks/integration/login.mocks";
import { token } from "../../mocks/integration/token.mocks";

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

  test("POST /login -> Should NOT be able to login with not registered credentials", async () => {
    const response = await request(app).post("/login").send(mockedUnregisteredCredentialsLoginRequest);
    
    expect(response.body).toHaveProperty("message")
    expect(response.body).not.toHaveProperty("token")
    expect(response.statusCode).toBe(401)
  })

  test("POST /login -> Should NOT be able to login with a deleted account", async () => {
    await request(app).delete("/users").set("Authorization", await token())

    const response = await request(app).post("/login").send(mockedLoginRequest);

    expect(response.body).not.toHaveProperty("token");
    expect(response.statusCode).toBe(401);
  })
});