const http = require("http");
const url = require("url");
const router = require("./router");

const server = http.createServer(function (req, res) {
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;

  const trimPath = path.replace(/^\/+|\/+$/g, "").split("/")[
    path.replace(/^\/+|\/+$/g, "").split("/").length - 1
  ];
  const method = req.method.toLowerCase();

  if (
    (method === "get" &&
      ["products", "editForm", "createForm", "delete"].indexOf(trimPath) >=
        0) ||
    (method === "post" && ["update", "create"].indexOf(trimPath) >= 0)
  ) {
    let chosenHandler =
      typeof router[trimPath] !== "undefined"
        ? router[trimPath]
        : handlers.notFound;

    if (chosenHandler) {
      chosenHandler(req, res);
    }
  }
});
//server start
server.listen(3000, function () {
  console.log("the server is listening on port 3000 now ");
});
