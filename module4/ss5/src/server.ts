import express from "express";
import * as path from "path";
import { AppDataSource } from "./data-source";
import { BlogEntity } from "./entity/blog";
import rateLimit from "express-rate-limit";
import crypto from "crypto";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const TOKEN = "SonPM@2023";

// SS5 - EX2 auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (
    !token ||
    token.split(" ").length !== 2 ||
    token.split(" ")[1] !== TOKEN
  ) {
    return res.status(401).send();
  }
  return next();
};

AppDataSource.initialize().then(async (connection) => {
  const blogRepository = connection.getRepository(BlogEntity);

  const app = express();
  app.set("view engine", "ejs");
  app.set("views", path.resolve(__dirname, "views"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(limiter);

  app.use(authMiddleware);

  app.get("/blogs", async (_, res) => {
    const blogs = await blogRepository.find();
    return res.status(200).json(blogs);
  });

  app.get("/blogs/:id", async (req, res) => {
    const blog = await blogRepository.findOne({
      where: {
        id: +((req.params.id as string) ?? "0"),
      },
    });
    return res.status(200).json(blog);
  });

  app.post("/blogs", async (req, res) => {
    await blogRepository.save(req.body);
    return res.status(201).json({ msg: "Create successfully" });
  });

  app.put("/blogs", async (req, res) => {
    const blog = await blogRepository.findOne({
      where: {
        id: +req.body.id,
      },
    });
    if (!blog) {
      return res.status(400).send();
    }

    blogRepository.merge(blog, { ...req.body, id: +req.body.id });
    await blogRepository.save(blog);
    return res.status(200).json({
      msg: "Update successfully",
    });
  });

  app.delete("/blogs/:id", async (req, res) => {
    const blog = await blogRepository.findOne({
      where: {
        id: +((req.params.id as string) ?? "0"),
      },
    });
    if (!blog) {
      return res.status(400).send();
    }

    await blogRepository.delete(blog.id);
    return res.status(200).json({ msg: "Delete successfully" });
  });

  const PORT = process.env.PORT ?? 8080;
  app.listen(PORT, () => console.log("Listening on port: " + PORT));
});
