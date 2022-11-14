const express = require("express");
const router = express.Router();
//importing todoController
const todoController = require("../controllers/todoController");

//todo routes 
router.get("/todos/", todoController.getAllTodos);
router.post("/todos/", todoController.addTodo);
router.delete("/todos/:id", todoController.deleteTodo);
router.put("/todos/:id", todoController.updateTodo);

module.exports = router;
