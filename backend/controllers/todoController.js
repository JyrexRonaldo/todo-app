const db = require("../config/drizzle");
const { todosTable } = require("../db/schema");

// const getTodos = async (req, res) => {
//   const { todo } = req.body;
//   await db.insert(todosTable).values({ todo });
//   res.json("Todo created");
// };

const createTodos = async (req, res) => {
  console.log(req.body)
  const { title } = req.body;
  await db.insert(todosTable).values({ title });
  res.json("Todo created");
};

module.exports = {
  // getTodos,
  createTodos
};
