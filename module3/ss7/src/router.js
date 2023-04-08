const fs = require("fs");
const path = require("path");
const qs = require("qs");

// list products
function products(_, res) {
  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data/products.json")).toString() ??
      `[]`
  );

  fs.readFile(
    path.join(__dirname, "views/list-products.html"),
    function (_, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      const htmlData = data.toString();
      res.write(
        htmlData.replace(
          "{listProducts}",
          products.length > 0
            ? products
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
}

function editForm(req, res) {
  const id = req.url.split("/")[2];

  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data/products.json")).toString() ??
      `[]`
  );

  const product = products.filter((p) => p.id === +id)[0];
  if (!product) {
    return res.status(400).send();
  }

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
}

function update(req, res) {
  let formData = "";
  req.on("data", (chunk) => {
    formData += chunk;
  });
  req.on("end", () => {
    const formDataJson = qs.parse(formData);

    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data/products.json")).toString() ??
        `[]`
    );
    const product = products.filter((p) => p.id === +formDataJson.id)[0];
    if (!product) {
      return res.end();
    }

    for (let p of products) {
      if (p.id === +formDataJson.id) {
        p.name = formDataJson.name;
        p.price = formDataJson.price;
        break;
      }
    }

    fs.writeFileSync(
      path.join(__dirname, "data/products.json"),
      JSON.stringify(products)
    );
  });
  res.writeHead(302, {
    Location: "/products",
  });
  res.end();
}

function deleteP(req, res) {
  const id = req.url.split("/")[2];

  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data/products.json")).toString() ??
      `[]`
  );

  const product = products.filter((p) => p.id === +id)[0];
  if (!product) {
    return res.status(400).send();
  }

  fs.writeFileSync(
    path.join(__dirname, "data/products.json"),
    JSON.stringify(products.filter((p) => p.id !== +id))
  );
  res.writeHead(302, {
    Location: "/products",
  });
  res.end();
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

function create(req, res) {
  let formData = "";
  req.on("data", (chunk) => {
    formData += chunk;
  });
  req.on("end", () => {
    const formDataJson = qs.parse(formData);
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data/products.json")).toString() ??
        `[]`
    );
    fs.writeFileSync(
      path.join(__dirname, "data/products.json"),
      JSON.stringify([
        ...products,
        { ...formDataJson, id: products.length + 1 },
      ])
    );
  });
  res.writeHead(302, {
    Location: "/products",
  });
  res.end();
}

//definer the request router
const router = {
  products,
  editForm,
  createForm,
  update,
  delete: deleteP,
  create,
};

module.exports = router;
