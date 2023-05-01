import express from "express";
import { AppDataSource } from "./data-source";
import { BlogEntity } from "./entity/blog";
import * as path from "path";
import * as shell from "shelljs";

shell.cp("-R", "src/views", "dist/views");

AppDataSource.initialize().then(async (connection) => {
  const blogRepository = connection.getRepository(BlogEntity);

  const app = express();
  app.set("view engine", "ejs");
  app.set("views", path.resolve(__dirname, "views"));
  app.use(express.urlencoded({ extended: false }));

  app.get("/blogs", async (_, res) => {
    const blogs = await blogRepository.find();
    return res.render("blogs.ejs", { blogs });
  });

  app.get("/blogs/:id", async (req, res) => {
    const blog = await blogRepository.findOne({
      where: {
        id: +((req.params.id as string) ?? "0"),
      },
    });
    return res.render("blogDetail.ejs", { blog });
  });

  app.get("/blog-creation-form", (_, res) => {
    res.render("create.ejs");
  });

  app.get("/blog-update-form/:id", async (req, res) => {
    const id = req.params.id;
    if (id) {
      const blog = await blogRepository.findOne({
        where: {
          id: +((req.params.id as string) ?? "0"),
        },
      });
      if (!blog) {
        return res.status(400).send();
      }
      return res.render("update.ejs", { blog });
    }
    return res.status(400).send();
  });

  app.post("/blogs/create", async (req, res) => {
    await blogRepository.save(req.body);
    return res
      .writeHead(302, {
        Location: "/blogs",
      })
      .end();
  });

  app.post("/blogs/update", async (req, res) => {
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

    return res
      .writeHead(302, {
        Location: "/blogs",
      })
      .end();
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
    return res.status(200).end();
  });

  const PORT = process.env.PORT ?? 8080;
  app.listen(PORT, () => console.log("Listening on port: " + PORT));
});
