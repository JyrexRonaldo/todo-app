const { drizzle } = require("drizzle-orm/node-postgres");
const db = drizzle({
  connection: process.env.DATABASE_URL,
  casing: "snake_case",
});

module.exports = db;
