import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedLoginRequest } from "../../mocks/integration/login.mocks";
import { token, updateUserToken } from "../../mocks/integration/token.mocks";
import { mockedCreatedUser } from "../../mocks/integration/user.mocks";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => { console.error("Error during initialization", err)});
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users -> Should NOT be able to create an account without email field", async () => {
    const { fullName, password, phone } = mockedCreatedUser;
    const userWithoutEmail = {
      fullName: fullName,
      password: password,
      phone: phone,
    };
    const response = await request(app).post("/users").send(userWithoutEmail);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("email");
    expect(response.body.email[0]).toEqual("Required");
  });

  test("POST /users -> Should NOT be able to create an account without fullName field", async () => {
    const { email, password, phone } = mockedCreatedUser;
    const userWithoutFullName = {
      email: email,
      password: password,
      phone: phone,
    };
    const response = await request(app)
      .post("/users")
      .send(userWithoutFullName);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("fullName");
    expect(response.body.fullName[0]).toEqual("Required");
  });

  test("POST /users -> Should NOT be able to create an account without phone field", async () => {
    const { email, password, fullName } = mockedCreatedUser;
    const userWithoutPhone = {
      email: email,
      password: password,
      fullName: fullName,
    };
    const response = await request(app).post("/users").send(userWithoutPhone);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("phone");
    expect(response.body.phone[0]).toEqual("Required");
  });

  test("POST /users -> Should NOT be able to create an account without password field", async () => {
    const { email, fullName, phone } = mockedCreatedUser;
    const userWithoutPassword = {
      email: email,
      fullName: fullName,
      phone: phone,
    };
    const response = await request(app)
      .post("/users")
      .send(userWithoutPassword);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("password");
    expect(response.body.password[0]).toEqual("Required");
  });

  test("POST /users -> Should NOT be able to create an account without a valid password", async () => {
    const { email, fullName, phone } = mockedCreatedUser;
    const userWithInvalidPassword = {
      email: email,
      fullName: fullName,
      phone: phone,
      password: "123",
    };
    const response = await request(app)
      .post("/users")
      .send(userWithInvalidPassword);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("password");
    expect(response.body.password[0]).toEqual(
      "Password need to be at least 4 characters"
    );
  });

  test("POST /users -> Should NOT be able to create an account without a valid e-mail field", async () => {
    const { fullName, phone, password } = mockedCreatedUser;
    const userWithInvalidEmail = {
      email: "invalid_mail.com",
      fullName: fullName,
      phone: phone,
      password: password,
    };
    const response = await request(app)
      .post("/users")
      .send(userWithInvalidEmail);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("email");
    expect(response.body.email[0]).toEqual("Invalid e-mail format");
  });

  test("POST /users -> Should be able to create an account", async () => {
    const response = await request(app).post("/users").send(mockedCreatedUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("fullName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("secondaryEmail");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("profileImg");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("deletedAt");

    expect(response.body.email).toEqual(mockedCreatedUser.email);
    expect(response.body.fullName).toEqual(mockedCreatedUser.fullName);
    expect(response.body.phone).toEqual(mockedCreatedUser.phone);
    expect(response.status).toBe(201);
  });

  test("POST /users -> Should NOT be able to create an account that already exists", async () => {
    const response = await request(app).post("/users").send(mockedCreatedUser);

    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /users/user -> Should NOT be able to list your profile without Token", async () => {
    const response = await request(app).get("/users/user");

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Token is missing");
    expect(response.status).toBe(401);
  });

  test("GET /users/user -> Should be able to list your own profile", async () => {
    const response = await request(app)
      .get("/users/user")
      .set("Authorization", await token());

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("fullName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("secondaryEmail");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("profileImg");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("deletedAt");
    expect(response.body).toHaveProperty("contacts");
    expect(response.body.contacts).toHaveProperty("length");

    expect(response.body.email).toEqual(mockedCreatedUser.email);
    expect(response.body.fullName).toEqual(mockedCreatedUser.fullName);
    expect(response.body.phone).toEqual(mockedCreatedUser.phone);
    expect(response.status).toBe(200);
  });

  test("PATCH /users -> Should NOT be able to update profile without authentication", async () => {
    const newUserData = {
      email: "updated_email@email.com",
      password: "abcde",
      profileImg: "http://imagerandom.com",
      phone: "995687523",
    };
    const response = await request(app).patch("/users").send(newUserData);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users -> Should be able to update profile", async () => {
    const newUserData = {
      email: "updated_email@email.com",
      password: "abcde",
      profileImg: "http://imagerandom.com",
      phone: "995687523",
    };

    const response = await request(app)
      .patch("/users")
      .send(newUserData)
      .set("Authorization", await updateUserToken());

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("fullName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("secondaryEmail");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("profileImg");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("deletedAt");

    expect(response.body.email).toEqual(newUserData.email);
    expect(response.body.profileImg).toEqual(newUserData.profileImg);
    expect(response.body.phone).toEqual(newUserData.phone);
    expect(response.status).toBe(200);
  });

  test("POST /login -> Should be able to login with new credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "updated_email@email.com", password: "abcde" });

    expect(response.body).toHaveProperty("token");
    expect(response.statusCode).toBe(200);
  });

  test("DELETE /users -> Should NOT be able to delete an account without authentication", async () => {
    const response = await request(app).delete("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Token is missing");
    expect(response.status).toBe(401);
  });

  test("DELETE /users -> Should be able to delete an account", async () => {
    const response = await request(app)
      .delete("/users")
      .set("Authorization", await token());

    expect(response.status).toBe(204);
  });

  test("POST /login -> Should NOT be able to login with a deleted account", async () => {
    const response = await request(app).post("/login").send(mockedLoginRequest);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Wrong email or password");
    expect(response.status).toBe(401);
  });
});
