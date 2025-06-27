import { User } from "../models/user.js";

const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findOne({
      verificationCode: code,
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid or expired code" });
    }
    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();
    return res
      .status(200)
      .json({ success: false, message: "Email verfied sucessfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
};
export default verifyEmail;
