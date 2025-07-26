import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { User } from "../../../models/user.js";
import validateRegister from "../../../utils/joi/auth/validateRegister.js";
import { sendOTPEmail } from "../../../utils/otp/email/sendOTP.js";
import generateOTP from "../../../utils/otp/email/generateOtp.js";

const signupController = async (req, res) => {
  console.log(req.body);
  const { error } = validateRegister(req.body);
  if (error) throw createHttpError.BadRequest(error.details[0].message);

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) throw createHttpError(409, "User already registered");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const verificationCode = generateOTP();
  const user = new User({
    ...req.body,
    verificationCode,
    password: hashedPassword,
  });

  if (await user.save()) {
    console.log("User registered successfully");
  }

  await sendOTPEmail(user.email, verificationCode);

  res.status(201).json({
    success: true,
    message: "User registered successfully. Verification code sent.",
  });
};
export default signupController;
