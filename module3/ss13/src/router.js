const connection = require("./createdb");
const qs = require("qs");
const fs = require("fs");
const path = require("path");

function createProduct(req, res) {
  let formData = "";
  req.on("data", (chunk) => {
    formData += chunk;
  });
  req.on("end", () => {
    const product = qs.parse(formData);
    const price = parseInt(product.price);
    const sqlCreate = `INSERT INTO products(name, price) VALUES ('${product.name}', ${price});`;
    connection.query(sqlCreate, (err, _) => {
      if (err) throw err;
      res.writeHead(302, {
        Location: "/products",
      });
      res.end();
    });
  });
}

function getProducts(req, res) {
  const sqlCreate = `SELECT * FROM products`;
  connection.query(sqlCreate, (err, results, _) => {
    if (err) throw err;
    fs.readFile(
      path.join(__dirname, "views/list-products.html"),
      function (_, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        const htmlData = data.toString();
        res.write(
          htmlData.replace(
            "{listProducts}",
            results.length > 0
              ? results
                  .map((product) => {
                    return `
                          <tr>
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td>${product.price}</td>
                            <td>
                              <div class="flex">
                                <button class="border rounded-lg px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white ml-2" onclick="window.location.href='/products/${product.id}/editForm'">
                                  Edit
                                </button>
      
                                <button class="border rounded-lg px-2 py-1 bg-red-500 hover:bg-red-700 text-white ml-2" onclick="window.location.href='/products/${product.id}/delete'">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        `;
                  })
                  .join("")
              : ""
          )
        );
        return res.end();
      }
    );
  });
}

function updateProduct(req, res) {
  let formData = "";
  req.on("data", (chunk) => {
    formData += chunk;
  });
  req.on("end", () => {
    const product = qs.parse(formData);
    const price = parseInt(product.price);
    const sqlCreate = `UPDATE products SET name = '${product.name}', price = ${price} WHERE id = ${product.id}`;
    connection.query(sqlCreate, (err, _) => {
      if (err) throw err;
      res.writeHead(302, {
        Location: "/products",
      });
      res.end();
    });
  });
}

function deleteProduct(req, res) {
  const id = req.url.split("/")[2];
  const sqlCreate = `DELETE FROM products WHERE id = ${id}`;
  connection.query(sqlCreate, (err, _) => {
    if (err) throw err;
    res.writeHead(302, {
      Location: "/products",
    });
    res.end();
  });
}

function editForm(req, res) {
  const id = req.url.split("/")[2];

  const sqlCreate = `SELECT * FROM products where id = ${id} LIMIT 1`;
  connection.query(sqlCreate, (err, results) => {
    if (err) throw err;
    if (!results || results.length === 0) {
      return res.send();
    }
    const product = results[0];
    fs.readFile(
      path.join(__dirname, "views/edit-product.html"),
      function (_, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        const htmlData = data.toString();
        res.write(
          htmlData
            .replace("{idValue}", product.id)
            .replace("{nameValue}", product.name)
            .replace("{priceValue}", product.price)
        );
        return res.end();
      }
    );
  });
}

function createForm(_, res) {
  fs.readFile(
    path.join(__dirname, "views/create-product.html"),
    function (_, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      const htmlData = data.toString();
      res.write(htmlData);
      return res.end();
    }
  );
}

const router = {
  editForm,
  createForm,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

module.exports = router;
