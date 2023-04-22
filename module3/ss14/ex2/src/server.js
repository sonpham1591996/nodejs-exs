const http = require("http");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");
const cookie = require("cookie");

const PRODUCTS = [
  {
    id: 1,
    name: "Apple iPad 10.2-inch (9th Gen) Wi-Fi, 2021",
    thumbnailURL:
      "https://salt.tikicdn.com/cache/750x750/ts/product/54/ff/25/bfdf0febe11a28eaa7cd3fa735a82c49.png.webp",
    price: 6990000,
  },
  {
    id: 2,
    name: "Apple iPhone 14 Pro Max",
    thumbnailURL:
      "https://salt.tikicdn.com/cache/750x750/ts/product/f5/52/80/675e31a670afc560e7b0e46c0b65fb4f.png.webp",
    price: 27490000,
  },
  {
    id: 3,
    name: "Apple iPhone 13",
    thumbnailURL:
      "https://salt.tikicdn.com/cache/750x750/ts/product/c2/95/b0/405e3bc7267cd545c76fd6eb93fa6045.png.webp",
    price: 16790000,
  },
];

const createRandomString = function (strLength) {
  strLength =
    (typeof strLength == "number") & (strLength > 0) ? strLength : false;
  if (strLength) {
    var possibleCharacter = "abcdefghiklmnopqwerszx1234567890";
    var str = "";
    for (let i = 0; i < strLength; i++) {
      let randomCharacter = possibleCharacter.charAt(
        Math.floor(Math.random() * possibleCharacter.length)
      );
      str += randomCharacter;
    }
    return str;
  }
};

const addToCart = (req, res) => {
  const selectedProduct = PRODUCTS.filter(
    (p) => p.id === +req.url.substring(req.url.lastIndexOf("/") + 1)
  )[0];

  if (!selectedProduct) {
    return res.end();
  }

  const cookies = cookie.parse(req.headers.cookie ?? "");
  let sessionId = cookies["SESSION-ID"];
  if (!sessionId) {
    sessionId = createRandomString(20);
  }

  let customizeData;

  try {
    const products = fs.readFileSync(
      path.resolve(__dirname, `./token/${sessionId}.txt`)
    );

    customizeData = JSON.parse((products ?? []).toString());
    let isExisted = false;
    for (let prod of customizeData) {
      if (prod.id === selectedProduct.id) {
        prod.quantity += 1;
        isExisted = true;
      }
    }

    if (!isExisted) {
      customizeData.push({
        ...selectedProduct,
        quantity: 1,
      });
    }
  } catch (err) {
    customizeData = [{ ...selectedProduct, quantity: 1 }];
  }
  fs.writeFileSync(
    path.resolve(__dirname, `./token/${sessionId}.txt`),
    JSON.stringify(customizeData),
    {
      flag: "w+",
    }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("SESSION-ID", String(sessionId), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
  );
  return res.end();
};

const getCart = (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? "");
  let sessionId = cookies["SESSION-ID"];
  if (!sessionId) {
    sessionId = createRandomString(20);
  }

  let products;

  try {
    const productsStr = fs.readFileSync(
      path.resolve(__dirname, `./token/${sessionId}.txt`)
    );
    products = JSON.parse(productsStr.toString());
  } catch (err) {
    products = [];
  }

  const cartData = fs.readFileSync(
    path.resolve(__dirname, "./views/cart.html"),
    { encoding: "utf-8" }
  );

  let productsInfoStr = "";

  for (let prod of products) {
    productsInfoStr += `
          <tr>
            <td>${prod.id}</td>
            <td>${prod.name}</td>
            <td>${prod.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}</td>
            <td>${prod.quantity}</td>
            <td>${(prod.price * prod.quantity).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}</td>
          </tr>
        `;
  }

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("SESSION-ID", String(sessionId), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
  );
  res.write(cartData.replace("{productsInCart}", productsInfoStr));
  return res.end();
};

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url.startsWith("/add-to-cart")) {
    return addToCart(req, res);
  } else if (req.method === "GET" && req.url === "/cart") {
    return getCart(req, res);
  } else {
    const productsPage = fs.readFileSync(
      path.join(__dirname, "views/products.html")
    );

    let productsStr = "";

    for (let prod of PRODUCTS) {
      productsStr += `
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
              <a href="#">
                  <img class="rounded-t-lg"
                      src="${prod.thumbnailURL}"
                      alt="" />
              </a>
              <div class="p-5">
                  <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${
                        prod.name
                      }</h5>
                  </a>
                  <p class="mb-3 font-normal text-red-700 text-xl">${prod.price.toLocaleString(
                    "it-IT",
                    { style: "currency", currency: "VND" }
                  )}</p>
                  <a href="/add-to-cart/${prod.id}"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Thêm vào giỏ hàng
                      <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                      </svg>
                  </a>
              </div>
          </div>
        `;
    }
    const cookies = cookie.parse(req.headers.cookie ?? "");
    let sessionId = cookies["SESSION-ID"];
    if (sessionId) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("SESSION-ID", String(sessionId), {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week
        })
      );
    }

    res.write(productsPage.toString().replace("{products}", productsStr));
    return res.end();
  }
});

server.listen(3000, function () {
  console.log("server running at localhost:3000 ");
});
