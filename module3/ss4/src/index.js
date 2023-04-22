const http = require("http");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");
//

const todos = [
  {
    id: 1,
    title: "Learn NodeJS",
  },
];

const getHomePage = (req, res) => {
  res.write("<h1>Hi, welcome to TODO application!</h1>");
  res.end();
};

const showListTodos = (req, res) => {
  let displayHTMLContent = fs
    .readFileSync(path.join(__dirname, "pages/display.html"))
    .toString();

  displayHTMLContent = displayHTMLContent.replace(
    "{listTodos}",
    todos
      .map((todo) => {
        return `
        <tr>
            <td>${todo.id}</td>
            <td>${todo.title}</td>
        </tr>
    `;
      })
      .join("")
  );
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(displayHTMLContent);
  res.end();
};

const getTodoCreationForm = (req, res) => {
  res.write(
    fs.readFileSync(path.join(__dirname, "pages/todo.html")).toString()
  );
  res.end();
};

const addTodo = (req, res) => {
  let formData = "";
  req.on("data", (chunk) => {
    formData += chunk;
  });
  req.on("end", () => {
    const formDataJson = qs.parse(formData);
    todos.push({
      id: todos.length + 1,
      title: formDataJson.title,
    });
  });
  res.writeHead(302, {
    Location: "/todos",
  });
  res.end();
};

// Create a new server from http
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      return getHomePage(req, res);
    }
    if (req.url === "/todos") {
      return showListTodos(req, res);
    }
    if (req.url === "/todo-creation-form") {
      return getTodoCreationForm(req, res);
    }
  } else if (req.method === "POST") {
    if (req.url === "/todos") {
      return addTodo(req, res);
    }
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
