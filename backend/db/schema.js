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
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 255 }).unique().notNull(),
  passwordHash: text("password_hash").notNull(),
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

module.exports = {
  todosTable,
  usersTable,
};
