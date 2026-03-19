const { Router } = require("express");
const todoRouter = Router();
const todoController = require('../controllers/todoController')

todoRouter.route('/todos' ).get(todoController.getTodos)
todoRouter.route('/todos/:id')

module.exports = todoRouter