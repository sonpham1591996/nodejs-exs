const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "change-me",
  database: "module3_ss13",
  charset: "utf8_general_ci",
});

connection.connect(function (err) {
  if (err) {
    throw err.stack;
  } else {
    console.log("connect success");
    const sql =
      "CREATE TABLE IF NOT EXISTS products (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,name varchar(30) not null, price double not null)";
    connection.query(sql, function (err) {
      if (err) {
        console.log(err);
      }
      console.log('Create table "products" success');
    });
    return;
  }
});

module.exports = connection;
