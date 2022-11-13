const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
router.get("/todos/all", todoController.getAllTodos);
router.post("/todos/", todoController.addTodo);
router.delete("/todos/:id", todoController.deleteTodo);
router.put("todos/:id", todoController.updateTodo);
module.exports = router;
