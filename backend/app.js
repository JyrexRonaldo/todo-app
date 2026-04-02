require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("./config/passport");
const PORT = process.env.PORT || 3000;
const rateLimit = require("express-rate-limit");
const todoRouter = require("./routes/todoRouter");
const authRouter = require("./routes/authRouter");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use(passport.authenticate("jwt", { session: false }));
app.get("/", (req, res) => {
  res.json("Hello World!");
});
app.use("/api", todoRouter);
app.use((err, req, res, next) => {
  console.log(err)
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
