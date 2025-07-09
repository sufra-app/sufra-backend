import sendOTP from "../../../utils/otp/phone/sendOTP.js";
import createHttpError from "http-errors";
import { User } from "../../../models/user.js";

const sendLoginOTP = async (req, res) => {
  const phoneNumber = req.body.phoneNumber?.trim();
  console.log("Phone number:", phoneNumber);
  if (!phoneNumber) {
    console.log("Phone number:", phoneNumber);
    throw createHttpError.BadRequest("Phone number is required.");
  }

  const user = await User.findOne({ phoneNumber });
  if (!user || !user.isPhoneVerified) {
    throw createHttpError.Unauthorized(
      "Phone number not registered or not verified."
    );
  }

  await sendOTP(phoneNumber);
  res.status(200).json({ message: "OTP sent to phone." });
};

export default sendLoginOTP;
