import Joi from "joi";

const validCategories = [
  "appetizer",
  "main course",
  "dessert",
  "drink",
  "salad",
  "soup",
  "snack",
];

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
});

export default validateUpdateDish;
