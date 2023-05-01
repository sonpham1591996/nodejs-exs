import { DataSource } from "typeorm";
import "reflect-metadata";

const nodeEnv = process.env.NODE_ENV;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 49154,
  username: "root",
  password: "password",
  database: "dbTestSS3",
  synchronize: true,
  logging: false,
  entities: [
    nodeEnv === "production"
      ? "dist/entity/*.js"
      : "src/entity/*.ts",
  ],
});
