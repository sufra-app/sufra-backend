import express from "express";
import verifyPhoneController from "../controllers/verifyPhone.js";
import sendPhoneOTPController from "../controllers/sendPhoneOTP.js";
import sendOTPLoginController from "../controllers/sendOTPLogin.js";
import verifyOTPLoginController from "../controllers/verifyOTPLogin.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();
router.post("/sendOTPLogin", sendOTPLoginController);
router.post("/verifyOTPLogin", verifyOTPLoginController);
router.use(authMiddleware);
router.post("/sendPhoneOTP", sendPhoneOTPController);
router.post("/verifyphone", verifyPhoneController);

export default router;
