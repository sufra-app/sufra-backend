import Joi from "joi";

const updateLogoSchema = Joi.object({
  logoUrl: Joi.string()
    .uri()
    .required()
    .messages({
      "string.uri": "Logo URL must be a valid URI.",
      "string.empty": "Logo URL is required.",
      "any.required": "Logo URL is required.",
    }),
});
export default updateLogoSchema;
