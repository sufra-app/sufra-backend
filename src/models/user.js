import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id },process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

const validateRegister = (data) => {
  const schema = Joi.object({
    Name: Joi.string().min(2).max(50).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

export { User, validateRegister };
