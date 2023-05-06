import { DataSource } from "typeorm";
import "reflect-metadata";

const nodeEnv = process.env.NODE_ENV;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3308,
  username: "root",
  password: "change-me",
  database: "db_test_ss4",
  synchronize: true,
  logging: false,
  entities: [
    nodeEnv === "production"
      ? "dist/entity/*.js"
      : "src/entity/*.ts",
  ],
});
