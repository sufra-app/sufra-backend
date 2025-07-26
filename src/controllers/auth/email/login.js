import { User } from "../../../models/user.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import validateLogin from "../../../utils/joi/auth/validateLogin.js";

const loginController = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) throw createHttpError.BadRequest(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw createHttpError.Unauthorized("User not found");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    throw createHttpError.BadRequest("Invalid email or password");

  if (!user.isVerified) {
    throw createHttpError.Forbidden(
      "Please verify your email before logging in."
    );
  }
  const token = await user.generateAuthToken();
  return res.status(200).json({
    success: true,
    message: "login successful",
    user:{
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

export default loginController;
