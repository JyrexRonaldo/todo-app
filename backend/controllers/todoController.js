const db = require("../config/drizzle");
const { todosTable } = require("../db/schema");

const getTodos = async (req, res) => {
  const result = await db.select().from(todosTable);
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

module.exports = {
  getTodos,
  createTodos,
};
