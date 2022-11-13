const sqlconnection = require("../dbConfig");

exports.getAllTodos = (req, res) => {
  let query = `SELECT * FROM todos`;
  sqlconnection.query(query, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(results);
  });
};

exports.addTodo = (req, res) => {
  let query = `insert into todos(title,completed) values('${req.body.title}',false);`;
  console.log(query);
  sqlconnection.query(query, (err, results, fields) => {
    if (err) {
      res.json({ status: 500, message: err.message });
    }
    res.json(results);
  });
};

exports.deleteTodo = (req, res) => {
  let query = `DELETE FROM todos WHERE id=${req.params.id};`;
  sqlconnection.query(query, (err, results, fields) => {
    if (err) {
      res.json({ status: 500, message: err.message });
    }
  });

  res.json({ status: 200, message: "todo deleted" });
};

exports.updateTodo = (req, res) => {
  let query = `update todos set completed= !completed where id=${req.params.id}`;
  sqlconnection.query(query, (err, results, fields) => {
    if (err) {
      res.json({ status: 500, message: err.message });
    }
  });

  res.json({ status: 200, message: "updated completed" });
};
