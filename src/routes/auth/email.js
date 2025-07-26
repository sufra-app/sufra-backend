import express from "express";
import loginController from "../../controllers/auth/email/login.js";
import signupController from "../../controllers/auth/email/signup.js";
import verifyEmailController from "../../controllers/auth/email/verifyEmail.js";
import sendResetLinkController from "../../controllers/auth/email/sendResetLinkController.js";
import resetPasswordController from "../../controllers/auth/email/resetPasswordController.js";
import resendEmailVerificationController from "../../controllers/auth/email/resendVerification.js";
const router = express.Router();
router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/resend-verification", resendEmailVerificationController);
router.post("/verify-email", verifyEmailController);
router.post("/send-reset-link", sendResetLinkController);
router.post("/reset-password", resetPasswordController);

export default router;
