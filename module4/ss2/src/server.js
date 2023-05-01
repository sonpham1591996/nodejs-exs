const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

// Connect to database
const connection = mysql.createConnection(
  "mysql://root:password@127.0.0.1:49154/dbTests"
);

connection.connect(function (err) {
  if (err) {
    throw err.stack;
  } else console.log("Connect to database successfully");
});
/**
 *
 *
 * @param {number} [limit=3]
 * @param {number} [skip=1]
 * @return {*}
 */
const fetchEmployees = (limit = 3, page = 1) => {
  if (page <= 0) return Promise.reject("Invalid page number");
  return new Promise(async (resolve, reject) => {
    const paginationPromise = new Promise(
      (resolvePaginationPromise, rejectPaginationPromise) => {
        const query = `SELECT * from employees LIMIT ? OFFSET ?`;
        connection.query(query, [limit, (+page - 1) * limit], (err, result) => {
          if (err) {
            rejectPaginationPromise(err);
          } else {
            resolvePaginationPromise(result);
          }
        });
      }
    );

    const countPromise = new Promise(
      (resolveCountPromise, rejectCountPromise) => {
        const query = `SELECT COUNT(*) as total from employees`;
        connection.query(query, (err, result) => {
          if (err) {
            rejectCountPromise(err);
          } else {
            resolveCountPromise(result);
          }
        });
      }
    );
    try {
      const [paginationResult, countResult] = await Promise.all([
        paginationPromise,
        countPromise,
      ]);

      const pages = Math.ceil(countResult[0].total / limit);

      resolve({
        employees: paginationResult,
        pages,
        hasNext: +page < pages,
        hasPrevious: +page > 1,
        currentPage: +page,
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 *
 *
 * @param {*} { name, department }
 * @return {*}
 */
const insertEmployee = ({ name, department }) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO employees (name, department) VALUES (?, ?)`;
    connection.query(query, [name, department], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
/**
 *
 *
 * @param {*} { id, name, department }
 * @return {*}
 */
const updateEmployee = ({ id, name, department }) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE employees set name = ?, department = ? WHERE id = ?`;
    connection.query(query, [name, department, id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
/**
 *
 *
 * @param {*} id
 * @return {*}
 */
const getEmployeeById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM employees WHERE id = ?`;
    connection.query(query, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result ? result[0] : null);
      }
    });
  });
};
/**
 *
 *
 * @param {*} id
 * @return {*}
 */
const deleteEmployee = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM employees WHERE id = ?`;
    connection.query(query, [id], (err, _) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// ============ Handlers =============
app.get("/employee-creation-form", (req, res) => {
  res.render("create.ejs");
});

app.get("/employee-update-form/:id", async (req, res) => {
  const id = req.params.id;
  if (id) {
    const employee = await getEmployeeById(+id);
    if (!employee) {
      return res.status(400).send();
    }
    return res.render("update.ejs", { employee });
  }
  return res.status(400).send();
});

app.get("", async (req, res) => {
  const { limit, page } = req.query;
  const paginationData = await fetchEmployees(limit, page);
  res.render("home.ejs", {
    paginationData,
  });
});

app.post("/employee/create", async (req, res) => {
  await insertEmployee(req.body);
  res.writeHead(302, {
    Location: "/",
  });
  return res.status(200).send();
});

app.post("/employee/update", async (req, res) => {
  const body = req.body;
  const employee = await getEmployeeById(body.id);
  if (!employee) {
    return res.status(400).send();
  }
  employee.name = body.name;
  employee.department = body.department;
  await updateEmployee(employee);
  res.writeHead(302, {
    Location: "/",
  });
  return res.status(200).send();
});

app.delete("/employee/:id", async (req, res) => {
  const id = req.params.id;
  if (id) {
    const employee = await getEmployeeById(+id);
    if (!employee) {
      return res.status(400).send();
    }
    await deleteEmployee(id);
  }
  return res.send();
});

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => console.log("Listening on port: " + PORT));
