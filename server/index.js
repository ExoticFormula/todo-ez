const express = require("express");
const app = express();
let mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kishorx123",
  database: "todoez",
});

connection.connect((err) => {
  if (err) return console.error("error: " + err.message);
  console.log("connected to mysql");
});
app.get("/getAllTodos", (req, res) => {
  let query = `SELECT * FROM todos`;
  connection.query(query, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(results);
  });
});

app.post("/addTodo", (req, res) => {
  console.log("hit");
  let query = `insert into todos(title,completed) values('${req.body.title}',false);`;
  console.log(query);
  connection.query(query, (err, results, fields) => {
    if (err) {
      res.json({ status: 500, message: err.message });
    }
    res.json(results);
  });
});

app.delete("/delete/:id", (req, res) => {
  let query = `DELETE FROM todos WHERE id=${req.params.id};`;
  connection.query(query, (err, results, fields) => {
    if (err) {
      res.json({ status: 500, message: err.message });
    }
  });

  res.json({ status: 200, message: "todo deleted" });
});

app.put("/update/completed/:id", (req, res) => {
  let query = `update todos set completed= !completed where id=${req.params.id}`;
  connection.query(query, (err, results, fields) => {
    if (err) {
      res.json({ status: 500, message: err.message });
    }
  });

  res.json({ status: 200, message: "updated completed" });
});
app.listen(3001, () => {
  console.log("server running on port " + 3000);
});
