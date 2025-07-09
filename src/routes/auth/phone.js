import express from "express";
import sendLoginOTPController from "../../controllers/auth/phone/sendLoginOTP.js";
import verifyLoginOTPController from "../../controllers/auth/phone/verifyLoginOTP.js";
import sendSignupOTPController from "../../controllers/auth/phone/sendSignupOTP.js";
import verifySignupOTPController from "../../controllers/auth/phone/verifySignupOTP.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

router.post("/login/otp/send", sendLoginOTPController);
router.post("/login/otp/verify", verifyLoginOTPController);

router.use(authMiddleware);

router.post("/signup/otp/send", sendSignupOTPController);
router.post("/signup/otp/verify", verifySignupOTPController);

export default router;
