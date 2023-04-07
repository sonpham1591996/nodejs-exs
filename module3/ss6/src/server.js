const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const qs = require("qs");

const server = http.createServer(function (req, res) {
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  const trimPath = path.replace(/^\/+|\/+$/g, "");

  const method = req.method.toLowerCase();

  if (method === "get") {
    let chosenHandler =
      typeof router[trimPath] !== "undefined"
        ? router[trimPath]
        : handlers.notFound;
    chosenHandler(req, res);
  } else {
    router.profile(req, res);
  }
});
//server start
server.listen(3000, function () {
  console.log("the server is listening on port 3000 now ");
});

const handlers = {};
// form login
handlers.login = function (rep, res) {
  fs.readFile(path.join(__dirname, "views/login.html"), function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
};
// home page
handlers.home = function (rep, res) {
  fs.readFile(path.join(__dirname, "views/home.html"), function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
};

// not found
handlers.notFound = function (rep, res) {
  fs.readFile(
    path.join(__dirname, "views/notfound.html"),
    function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    }
  );
};
// profile
handlers.profile = function (req, res) {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    data = qs.parse(data);
    var name = data.name;
    var stringObject = "<h1>Hello " + name + "</h1>";
    console.log(name);
    fs.writeFile(
      path.join(__dirname, "views/profile.html"),
      stringObject,
      function (err) {
        if (err) {
          return console.error(err);
        }
        console.log("Ghi du lieu vao file thanh cong!");
        console.log("Doc du lieu vua duoc ghi");
        fs.readFile(path.join(__dirname, "views/profile.html"), function (err, data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        });
      }
    );
  });
};
//definer the request router
const router = {
  home: handlers.home,
  login: handlers.login,
  profile: handlers.profile,
};
