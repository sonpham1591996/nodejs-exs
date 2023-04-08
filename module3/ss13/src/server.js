const http = require("http");
const router = require("./router");

const server = http.createServer(async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        if (req.url === "/products/create")
          return router.createProduct(req, res);
        if (req.url === "/products/update")
          return router.updateProduct(req, res);
        return res.end();
      case "GET":
        if (req.url === "/products") {
          return router.getProducts(req, res);
        } else if (req.url.lastIndexOf("createForm") > 0) {
          return router.createForm(req, res);
        } else if (req.url.lastIndexOf("editForm") > 0) {
          return router.editForm(req, res);
        } else if (req.url.lastIndexOf("delete") > 0) {
          return router.deleteProduct(req, res);
        }
        return res.end();
      default:
        return res.end();
    }
  } catch (err) {
    return res.end(err.message);
  }
});

server.listen(3000, function () {
  console.log("server running at localhost:3000 ");
  require("./createdb");
});
