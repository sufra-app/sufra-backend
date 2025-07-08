import express from "express";
import loginController from "../controllers/login.js";
import signupController from "../controllers/signup.js";
import verifyEmailController from "../controllers/verifyEmail.js";
import verifyPhoneController from "../controllers/verifyPhone.js";
import sendPhoneOTPController from "../controllers/sendPhoneOTP.js";
const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/verifyemail", verifyEmailController);
router.post("/sendPhoneOTP", sendPhoneOTPController);
router.post("/verifyphone", verifyPhoneController);

export default router;
