import express from "express";
import sendLoginOTPController from "../../controllers/auth/phone/sendLoginOTP.js";
import verifyLoginOTPController from "../../controllers/auth/phone/verifyLoginOTP.js";
import sendSignupOTPController from "../../controllers/auth/phone/sendSignupOTP.js";
import verifySignupOTPController from "../../controllers/auth/phone/verifySignupOTP.js";
import authMiddleware from "../../middlewares/auth.js";
import chooseRoleController from "../../controllers/auth/phone/chooseRole.js";

const router = express.Router();

router.post("/login/otp/send", sendLoginOTPController);
router.post("/login/otp/verify", verifyLoginOTPController);

router.use(authMiddleware);

router.post("/signup/otp/send", sendSignupOTPController);
router.post("/signup/otp/verify", verifySignupOTPController);
router.post("/signup/otp/choose-role", chooseRoleController);

export default router;
