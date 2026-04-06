const db = require("../config/drizzle");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { usersTable } = require("../db/schema");
const { eq } = require("drizzle-orm");
const { body, validationResult, matchedData } = require("express-validator");

const validateUser = [
  body("email").trim().isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];

const createUser = [
  validateUser,
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(result.errors.map((error) => error.msg));
      return res.status(400).json(result.errors.map((error) => error.msg));
    }

    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(usersTable).values({ email, passwordHash: hashedPassword });

    // res.json("Registration successful! You can now login.");
    next();
  },
];

const handleSignIn = [
  validateUser,
  async (req, res) => {
    const { email, password } = req.body;

    const [user] = [
      ...(await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))),
    ];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "14d" },
    );

    let message = null;
    if (req.body.name) {
      message = "Registration successful!, logging you in";
    } else {
      message = "Welcome, logging you in";
    }

    return res.status(200).json({
      token: `Bearer ${token}`,
      userId: user.id,
      email: user.email,
    });
  },
];

module.exports = { createUser, handleSignIn };
