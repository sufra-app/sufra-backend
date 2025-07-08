import createHttpError from "http-errors";
import verifyOTP from "../utils/otp/phone/verifyOTP.js";
import { User } from "../models/user.js";

const verifyPhone = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw createHttpError.Unauthorized("User not authenticated");
  }
  const { phoneNumber, code } = req.body;
  if (!phoneNumber || !code) {
    throw createHttpError.BadRequest("Phone number and code are required");
  }
  const response = await verifyOTP(phoneNumber, code);
  if (response.status !== "approved") {
    throw createHttpError.BadRequest("Invalid or expired code");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError.Unauthorized("User not found");
  }
  user.isPhoneVerified = true;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Phone number verified successfully",
  });
};
export default verifyPhone;
