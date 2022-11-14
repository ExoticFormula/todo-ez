const connection = require("../dbConfig");

/*
GET
select all todos
*/
exports.getAllTodos = (req, res) => {
  let query = `SELECT * FROM todos`;
  connection.query(query, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(results);
  });
};

/*
POST
add a new todo
*/
exports.addTodo = (req, res) => {
  let query = `insert into todos(title,completed) values('${req.body.title}',false);`;
  connection.query(query, (err, results, fields) => {
    if (err) {
      res.json({ status: 500, message: err.message });
    }
    res.json(results);
  });
};

/*
PUT
update a todo
*/
exports.updateTodo = (req, res) => {
  /*if request body contains a title,then just update title and return
  else its a request for changing its completed state
  */
  let query = `update todos set title= '${req.body.title}' where id=${req.params.id}`;
  if (req.body.title) {
    connection.query(query, (err, results, fields) => {
      if (err) {
        res.json({ status: 500, message: err.message });
      } else {
        res.json({ status: 200, message: "title updated" });
      }
    });
  } else {
    query = `update todos set completed= !completed where id=${req.params.id}`;
    connection.query(query, (err, results, fields) => {
      if (err) {
        res.json({ status: 500, message: err.message });
      } else {
        res.json({ status: 200, message: "updated completed" });
      }
    });
  }
};

/*
DELETE
delete a todo
*/
exports.deleteTodo = (req, res) => {
  let query = `DELETE FROM todos WHERE id=${req.params.id};`;
  connection.query(query, (err, results, fields) => {
    if (err) {
      res.json({ status: 500, message: err.message });
    }
  });

  res.json({ status: 200, message: "todo deleted" });
};
