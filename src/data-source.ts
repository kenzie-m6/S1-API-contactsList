import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { User} from "./entities";
import {InitialMigration1679424210915} from "./migrations/1679424210915-InitialMigration" 
import { Contact } from "./entities/contacts.entity";
import { Contacts1679425196677 } from "./migrations/1679425196677-Contacts";

const dataSourceConfig = (): DataSourceOptions => {

  const dbUrl: string | undefined = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("Var env DATABASE_URL was not defined");
  }

  const nodeEnv: string | undefined = process.env.NODE_ENV;
  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [User, Contact]
    };
  }
  return {
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: true,
    entities: [User, Contact],
    migrations: [InitialMigration1679424210915, Contacts1679425196677],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());
