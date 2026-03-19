require("dotenv").config();
const express = require("express");
// const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const todoRouter = require('./routes/todoRouter')

app.use(express.json());


app.get("/", (req,res) => {
    res.json('Hello World!')
});
app.use("/api", todoRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
