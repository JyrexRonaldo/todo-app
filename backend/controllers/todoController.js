const { eq } = require("drizzle-orm");
const db = require("../config/drizzle");
const { todosTable, usersTable } = require("../db/schema");

const getTodosByUserId = async (req, res) => {
  const { userId } = req.query;
  const result = await db
    .select()
    .from(todosTable)
    .where(eq(userId, todosTable.userId));
  res.json(result);
};

const createTodos = async (req, res) => {
  const { userId, text, position } = req.body;
  if (text.trim() === "") {
    return;
  }
  const data = await db
    .insert(todosTable)
    .values({ userId, text, position })
    .returning();
  res.json(data);
};

const deleteTodoById = async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await db
    .delete(todosTable)
    .where(eq(todosTable.id, id))
    .returning();
  res.status(200).json(deletedTodo);
};

module.exports = {
  createTodos,
  getTodosByUserId,
  deleteTodoById,
};
