const { eq, inArray, sql, and } = require("drizzle-orm");
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

const completeTodo = async (req, res) => {
  const { id } = req.params;
  const { completeStatus } = req.body;
  const todoItem = await db
    .update(todosTable)
    .set({ completed: completeStatus })
    .where(eq(todosTable.id, id))
    .returning();
  res.status(200).json({ message: "Todo updated", todo: todoItem });
};

const updatePositions = async (req, res) => {
  const { positions } = req.body;

  if (positions.length === 0) {
    return;
  }

  const sqlChunks = [];
  const ids = [];
  sqlChunks.push(sql`(case`);
  for (const input of positions) {
    sqlChunks.push(
      sql`when ${todosTable.id} = ${input.todoId} then cast(${input.position} as int)`,
    );
    ids.push(input.todoId);
  }
  sqlChunks.push(sql`end)`);
  const finalSql = sql.join(sqlChunks, sql.raw(" "));
  await db
    .update(todosTable)
    .set({ position: finalSql })
    .where(inArray(todosTable.id, ids));

  res.status(200).json({ message: "passed" });
};

const deleteCompletedTodos = async (req, res) => {
  const [user] = req.user 
  const deletedTodoIds = (await db
    .delete(todosTable)
    .where(
      and(eq(todosTable.completed, true), eq(todosTable.userId, user.id)),
    )
    .returning()).map(todoItem => todoItem.id);
  res.status(200).json(deletedTodoIds);
};

module.exports = {
  createTodos,
  getTodosByUserId,
  deleteTodoById,
  completeTodo,
  updatePositions,
  deleteCompletedTodos,
};
