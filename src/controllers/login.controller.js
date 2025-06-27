import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";

const loginController = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(409).send({ message: "Invalid email or password" });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).send({ message: "Invalid email or password" });

    const token = user.generateAuthToken();
    res.status(200).send({ message: "Login successful", token });
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};
export default loginController;
