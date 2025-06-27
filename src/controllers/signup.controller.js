import bcrypt from "bcrypt";
import { User, validateRegister } from "../models/user.js";
import { sendVerificationCode } from "../middlewares/Email.js";
const signupController = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(409).send({ message: "User already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const vreificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    console.log(vreificationCode);
    const user = new User({
      ...req.body,
      verificationCode: vreificationCode,
      password: hashedPassword,
    });
    await user.save();
    sendVerificationCode(user.email, vreificationCode);

    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
};
export default signupController;
