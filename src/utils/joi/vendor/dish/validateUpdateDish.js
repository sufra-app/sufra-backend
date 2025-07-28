import Joi from "joi";

const validateUpdateDish = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  photo: Joi.string().uri().optional(),
  price: Joi.number().min(0).optional(),
  category: Joi.string()
    .valid(...validCategories)
    .optional(),
  dietaryRestrictions: Joi.array().items(Joi.string()).default(["any"]),
  preparationTime: Joi.object({
    min: Joi.number().required(),
    max: Joi.number().required(),
  }).optional(),
  maxOrdersPerSlot: Joi.number().optional(),
});

export default validateUpdateDish;
