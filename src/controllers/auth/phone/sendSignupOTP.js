import sendOTP from "../../../utils/otp/phone/sendOTP.js";
import createHttpError from "http-errors";
import { User } from "../../../models/user.js";

const sendSignupOTP = async (req, res) => {
  console.log("req.body:", req.body);
  const phoneNumber = req.body.phoneNumber?.trim();

  if (!phoneNumber) {
    throw createHttpError.BadRequest("Phone number is required.");
  }
  const userId = req.user._id;
  const existing = await User.findOne({ phoneNumber });
  if (existing && existing._id.toString() !== userId.toString()) {
    throw createHttpError.Conflict(
      "Phone number already in use by another user."
    );
  }

  await sendOTP(phoneNumber);
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError.Unauthorized("User not authenticated");
  }

  user.phoneNumber = phoneNumber;
  user.isPhoneVerified = false;
  await user.save();

  res.status(200).json({ message: "OTP sent to phone successfully." });
};
export default sendSignupOTP;
