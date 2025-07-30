import Joi from "joi";

const updateLogoSchema = Joi.object({
  photoUrl: Joi.string().uri().required().messages({
    "string.uri": "photo URL must be a valid URI.",
    "string.empty": "photo URL is required.",
    "any.required": "photo URL is required.",
  }),
});
export default updateLogoSchema;