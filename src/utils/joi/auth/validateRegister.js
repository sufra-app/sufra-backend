import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    phoneNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .label("Phone Number"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

export default validateRegister;
