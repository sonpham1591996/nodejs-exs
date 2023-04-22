const http = require("http");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");
const cookie = require("cookie");

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/declare") {
    let formData = "";
    req.on("data", (chunk) => {
      formData += chunk;
    });

    req.on("end", () => {
      const data = qs.parse(formData);
      console.log(data);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("name", String(data.fullName), {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
        })
      );

      res.statusCode = 302;
      res.setHeader("Location", req.headers.referer || "/");
      return res.end();
    });
  } else {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    console.log("name = " + (cookies.name ?? ""));

    fs.readFile(path.join(__dirname, "views/form.html"), function (_, data) {
      res.write(data);
      return res.end();
    });
  }
});

server.listen(3000, function () {
  console.log("server running at localhost:3000 ");
});
