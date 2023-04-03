const http = require("http");
const qs = require("qs");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const users = [];

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const userForm = fs
      .readFileSync(path.join(__dirname, "pages/add-user-form.html"))
      .toString();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(userForm);
    res.end();
    return;
  }

  if (req.method === "POST") {
    let formData = "";
    req.on("data", (chunk) => (formData += chunk));

    req.on("end", () => {
      const userJsonData = qs.parse(formData);
      users.push({
        id: users.length + 1,
        ...userJsonData,
      });
      console.log(users);
      res.writeHead(302, {
        Location: "/",
      });
      res.end();
    });
  }
});

server.listen(PORT, () => console.log("Server is listening on port " + PORT));
