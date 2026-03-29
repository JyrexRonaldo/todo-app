const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

authRouter.route("/signup").post(authController.createUser, authController.handleSignIn);

authRouter.route("/signin").post(authController.handleSignIn);

module.exports = authRouter