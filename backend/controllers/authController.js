const db = require("../config/drizzle");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { usersTable } = require("../db/schema");
const { eq } = require("drizzle-orm");

const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(usersTable).values({ email, passwordHash: hashedPassword });

  // res.json("Registration successful! You can now login.");
  next()
};

const handleSignIn = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
    
  if (!user[0]) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user[0].passwordHash);

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
    userId: user[0].id,
    email: user[0].email,
  });
};

module.exports = { createUser, handleSignIn };
