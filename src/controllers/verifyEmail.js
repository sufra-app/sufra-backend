import createHttpError from "http-errors";
import { User } from "../models/user.js";

const verifyEmail = async (req, res) => {
  const { code } = req.body;
  const user = await User.findOne({
    verificationCode: code,
  });
  if (!user) {
    throw createHttpError.BadRequest("invalid or expired code");
  }
  user.isVerified = true;
  user.verificationCode = undefined;
  await user.save();
  const token = user.generateAuthToken();
  return res.status(200).json({
    success: true,
    message: "Email verfied sucessfully",
    token,
  });
};
export default verifyEmail;
