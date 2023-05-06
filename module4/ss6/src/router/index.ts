import express from "express";
import contactRouter from "./contact";

const rootRouter = express.Router();

rootRouter.use("/contacts", contactRouter);

export default rootRouter;
