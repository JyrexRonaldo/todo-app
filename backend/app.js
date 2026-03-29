require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const todoRouter = require("./routes/todoRouter");
const authRouter = require("./routes/authRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.json("Hello World!");
});
app.use("/api", todoRouter);
app.use((err, req, res, next) => {
  if (err.cause.code === "23505") {
    res.status(500).send({ message: "Email already in use" });
  }
  // res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
