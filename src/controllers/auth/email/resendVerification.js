import { User } from "../../../models/user.js";
import generateOTP from "../../../utils/otp/email/generateOtp.js";
import { sendOTPEmail } from "../../../utils/otp/email/sendOTP.js";
import createHttpError from "http-errors";

const resendEmailVerificationController = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw createHttpError.NotFound("User not found");

    if (user.isVerified) {
      return res.status(200).json({ message: "Email already verified" });
    }

    user.verificationCode = generateOTP();
    await user.save();

    await sendOTPEmail(user.email, user.verificationCode);

    res.status(200).json({
      success: true,
      message: "Verification email sent again.",
    });
};
export default resendEmailVerificationController;