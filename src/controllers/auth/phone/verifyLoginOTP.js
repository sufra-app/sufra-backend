import verifyOTP from "../../../utils/otp/phone/verifyOTP.js";
import createHttpError from "http-errors";
import { User } from "../../../models/user.js";

const verifyLoginOTP = async (req, res) => {
  const { phoneNumber, code } = req.body;
  if (!phoneNumber || !code) {
    throw createHttpError.BadRequest("Phone number and code are required.");
  }

  const verification = await verifyOTP(phoneNumber, code);
  if (verification.status !== "approved") {
    throw createHttpError.BadRequest("Invalid or expired OTP code.");
  }

  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw createHttpError.NotFound("User not found.");
  }

  const token = user.generateAuthToken();

  res.status(200).json({
    message: "Logged in successfully with phone.",
    token,
    user: {
      id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  });
};

export default verifyLoginOTP;
