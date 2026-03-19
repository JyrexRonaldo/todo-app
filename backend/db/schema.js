const { integer, pgTable, varchar } = require("drizzle-orm/pg-core");

// const usersTable = pgTable("users", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   name: varchar({ length: 255 }).notNull(),
//   age: integer().notNull(),
//   email: varchar({ length: 255 }).notNull(),
// });

const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
});

const todosTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
});

module.exports = { todosTable };
