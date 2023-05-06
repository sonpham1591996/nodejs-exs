import express from "express";
import * as path from "path";
import { AppDataSource } from "./data-source";
import { BlogEntity } from "./entity/blog";

AppDataSource.initialize().then(async (connection) => {
  const blogRepository = connection.getRepository(BlogEntity);

  const app = express();
  app.set("view engine", "ejs");
  app.set("views", path.resolve(__dirname, "views"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

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
