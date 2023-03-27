import "express-async-errors";
import express, { Application } from "express";
import bodyParser from "body-parser";
import { handleErrors } from "./errors";
import { userRoutes } from "./routes/users.routes";
import { contactsRoutes } from "./routes/contacts.routes";
import { loginRoutes } from "./routes/login.route";
import cors from "cors";

export const app: Application = express();
app.use(bodyParser.json());
app.use(cors())
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/contacts", contactsRoutes);

app.use(handleErrors);
