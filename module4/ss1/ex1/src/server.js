const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

const BLOGS = [];

app.get("/blog-creation-form", (req, res) => {
  res.render("blog.ejs");
});

app.get("", (req, res) => {
  res.render("home.ejs", { blogs: BLOGS });
});

app.post("/blog", (req, res) => {
  BLOGS.push({
    ...req.body,
    id: BLOGS.length + 1,
  });
  res.writeHead(302, {
    Location: "/",
  });
  return res.send();
});

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => console.log("Listening on port: " + PORT));
