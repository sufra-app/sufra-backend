import { User } from "../../../models/user.js";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const resetPasswordController = async (req, res) => {
  const { id, token, password } = req.body;

  const user = await User.findById(id);
  if (!user) throw createHttpError.BadRequest("User does not exist!");

  const secret = process.env.JWT_SECRET + user.password;

  const verify = jwt.verify(token, secret);
  if (!verify) {
    throw createHttpError.Unauthorized("Invalid or expired token");
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  await User.findByIdAndUpdate(
    id,
    {
      $set: { password: encryptedPassword },
    },
    { runValidators: true }
  );

  res.status(200).json({ message: "Password has been reset successfully." });
};

export default resetPasswordController;
