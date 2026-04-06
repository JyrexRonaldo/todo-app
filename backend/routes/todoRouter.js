const { Router } = require("express");
const todoRouter = Router();
const todoController = require("../controllers/todoController");

todoRouter
  .route("/todos")
  .get(todoController.getTodosByUserId)
  .post(todoController.createTodos)
  .patch(todoController.updatePositions)
  .delete(todoController.deleteCompletedTodos);

todoRouter
  .route("/todos/:id")
  .delete(todoController.deleteTodoById)
  .patch(todoController.completeTodo);

module.exports = todoRouter;
