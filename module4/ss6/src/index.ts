import express from "express";
import { connectMongoDB } from "./configs/connectMongoDB";
import rootRouter from "./router";
import * as path from "path";

const init = async () => {
  try {
    await connectMongoDB();
    const app = express();

    app.set("view engine", "ejs");
    app.set("views", path.resolve(__dirname, "views"));

    app.use(express.urlencoded({ extended: false }));

    app.use(rootRouter);

    app.listen(8080, () => console.log("Server is running on port 8080"));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

init();
