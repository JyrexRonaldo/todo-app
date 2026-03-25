const {
  integer,
  pgTable,
  varchar,
  uuid,
  timestamp,
  text,
  boolean,
} = require("drizzle-orm/pg-core");

const usersTable = pgTable("users", {
  id: uuid().primaryKey(),
  email: varchar({ length: 255 }).notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

const todosTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid("user_id"),
  text: text().notNull(),
  completed: boolean().default(false),
  position: integer().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { todosTable, usersTable };
