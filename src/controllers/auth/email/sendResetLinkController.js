import { User } from "../../../models/user.js";
import createHttpError from "http-errors";
import signToken from "../../../utils/jwt/signToken.js";
import sendEmail from "../../../utils/resetPassword/sendEmail.js";
const sendResetLinkController = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw createHttpError.NotFound("User doesn't exist");
  const secret = process.env.JWT_SECRET + user.password;
  const token = await signToken({ id: user._id, email: user.email }, secret, {
    expiresIn: "1h",
  });

  const resetURL = `https://localhost:3000/resetpassword?id=${user._id}&token=${token}`;
  await sendEmail(email, resetURL);
  res.status(200).json({ message: "Password reset link sent" });
};
export default sendResetLinkController;
