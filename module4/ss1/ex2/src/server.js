const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

const EMPLOYEES = [];

app.get("/employee-creation-form", (req, res) => {
  res.render("employee.ejs");
});

app.get("", (req, res) => {
  res.render("home.ejs", { employees: EMPLOYEES });
});

app.post("/employee", (req, res) => {
  EMPLOYEES.push({
    ...req.body,
    id: EMPLOYEES.length + 1,
  });
  res.writeHead(302, {
    Location: "/",
  });
  return res.status(200).send();
});

app.delete("/employee/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    const indexOfDeletedEmployee = EMPLOYEES.findIndex((e) => e.id === +id);
    if (indexOfDeletedEmployee >= 0) {
      EMPLOYEES.splice(indexOfDeletedEmployee, 1);
    }
  }
  return res.send();
});

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => console.log("Listening on port: " + PORT));
