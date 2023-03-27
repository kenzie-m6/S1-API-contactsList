import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  mockedCreatedContact,
  mockedCreatedToUpdateContact,
} from "../../mocks/integration/contacts.mocks";
import { token } from "../../mocks/integration/token.mocks";
import { mockedCreatedUser } from "../../mocks/integration/user.mocks";

describe("/contacts", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during initialization", err);
      });

    await request(app).post("/users").send(mockedCreatedUser);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /contacts -> Should NOT be able to create a contact without email field", async () => {
    const { fullName, phone } = mockedCreatedContact;
    const contactWithoutEmail = {
      fullName: fullName,
      phone: phone,
    };
    const response = await request(app)
      .post("/contacts")
      .send(contactWithoutEmail)
      .set("Authorization", await token());

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("email");
    expect(response.body.email[0]).toEqual("Required");
  });

  test("POST /contacts -> Should NOT be able to create a contact without phone field", async () => {
    const { fullName, email } = mockedCreatedContact;
    const contactWithoutPhone = {
      fullName: fullName,
      email: email,
    };
    const response = await request(app)
      .post("/contacts")
      .send(contactWithoutPhone)
      .set("Authorization", await token());

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("phone");
    expect(response.body.phone[0]).toEqual("Required");
  });

  test("POST /contacts -> Should NOT be able to create a contact without fullName field", async () => {
    const { phone, email } = mockedCreatedContact;
    const contactWithoutfullName = {
      phone: phone,
      email: email,
    };
    const response = await request(app)
      .post("/contacts")
      .send(contactWithoutfullName)
      .set("Authorization", await token());

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("fullName");
    expect(response.body.fullName[0]).toEqual("Required");
  });

  test("POST /contacts -> Should NOT be able to create a contact without a valid email", async () => {
    const { phone, fullName } = mockedCreatedContact;
    const contactWithInvalidMail = {
      phone: phone,
      email: "invalid_mail.com",
      fullName: fullName,
    };
    const response = await request(app)
      .post("/contacts")
      .send(contactWithInvalidMail)
      .set("Authorization", await token());

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("email");
    expect(response.body.email[0]).toEqual("Invalid email format");
  });

  test("POST /contacts -> Should NOT be able to create a contact without authorization", async () => {
    const response = await request(app)
      .post("/contacts")
      .send(mockedCreatedContact);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /contacts -> Should be able to create a contact", async () => {
    const response = await request(app)
      .post("/contacts")
      .send(mockedCreatedContact)
      .set("Authorization", await token());

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("fullName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("secondaryEmail");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("profileImg");
    expect(response.body).toHaveProperty("createdAt");

    expect(response.body.email).toEqual(mockedCreatedContact.email);
    expect(response.body.fullName).toEqual(mockedCreatedContact.fullName);
    expect(response.body.phone).toEqual(mockedCreatedContact.phone);
    expect(response.status).toBe(201);
  });

  test("POST /contacts -> Should NOT be able to create a contact that already exists", async () => {
    const response = await request(app)
      .post("/contacts")
      .send(mockedCreatedContact)
      .set("Authorization", await token());

    expect(response.body).toHaveProperty("message");

    expect(response.body.message).toEqual("Contact already exists");
    expect(response.status).toBe(409);
  });

  test("GET /users/user -> Contact was registered at the correct user ", async () => {
    const response = await request(app)
      .get("/users/user")
      .set("Authorization", await token());

    expect(response.body.contacts).toHaveLength(1);

    expect(response.body.contacts[0].email).toEqual(mockedCreatedContact.email);
    expect(response.body.contacts[0].fullName).toEqual(
      mockedCreatedContact.fullName
    );
    expect(response.body.contacts[0].phone).toEqual(mockedCreatedContact.phone);
    expect(response.status).toBe(200);
  });

  test("GET /contacts -> Should NOT be able to list contacts without authorization", async () => {
    const response = await request(app).get("/contacts");

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Token is missing");
    expect(response.status).toBe(401);
  });

  test("GET /contacts -> Should be able to list contacts", async () => {
    const response = await request(app)
      .get("/contacts")
      .set("Authorization", await token());

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /contacts/:id -> Should NOT be able to list a contact without authorization", async () => {
    const contactId = await request(app)
      .get("/contacts")
      .set("Authorization", await token());

    const response = await request(app).get(
      `/contacts/${contactId.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Token is missing");
    expect(response.status).toBe(401);
  });

    test("GET /contacts/:id -> Should be able to list a contact", async () => {
      const contactId = await request(app)
      .get("/contacts")
      .set("Authorization", await token());
      
      const response = await request(app)
      .get(`/contacts/${contactId.body[0].id}`)
      .set("Authorization", await token());

      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("fullName");
      expect(response.body).toHaveProperty("email");
      expect(response.body).not.toHaveProperty("length");
      expect(response.status).toBe(200);

    })

  test("PATCH /contacts/:id -> Should be able to update a contact", async () => {
    const contactId = await request(app)
      .post("/contacts")
      .send(mockedCreatedToUpdateContact)
      .set("Authorization", await token());

    const newContactData = {
      email: "updated_email@email.com",
      profileImg: "http://imagerandom.com",
      phone: "995687523",
    };

    const response = await request(app)
      .patch(`/contacts/${contactId.body.id}`)
      .send(newContactData)
      .set("Authorization", await token());

    expect(response.status).toBe(200);
  });
});
