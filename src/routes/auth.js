import express from "express";
import loginController from "../controllers/login.controller.js";
import signupController from "../controllers/signup.controller.js";
import verifyEmailController from "../controllers/verifyEmail.controller.js";
const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/verifyemail", verifyEmailController);

export default router;
