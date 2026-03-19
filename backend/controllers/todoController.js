const db = require("../config/drizzle");
const { todosTable } = require("../db/schema");

const getTodos = async (req, res) => {
  const result = await db.select().from(todosTable);
  res.json(result);
};

const createTodos = async (req, res) => {
  const { title } = req.body;
  const data = await db.insert(todosTable).values({ title }).returning();
  res.json(data);
};

module.exports = {
  getTodos,
  createTodos
};
