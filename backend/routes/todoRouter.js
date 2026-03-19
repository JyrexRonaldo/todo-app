const { Router } = require("express");
const todoRouter = Router();
const todoController = require("../controllers/todoController");

todoRouter.route("/todos").post(todoController.createTodos);
todoRouter.route("/todos/:id");

module.exports = todoRouter;
