import Joi from "joi";

const validCategories = [
  "appetizer",
  "main course",
  "dessert",
  "beverage",
  "salad",
  "soup",
  "snack",
];

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  photo: Joi.string().uri().optional(),
  price: Joi.number().min(0).required(),
  category: Joi.string().valid(...validCategories).required(),
  dietaryRestrictions: Joi.array().items(Joi.string()).default(["any"]),
  preparationTime: Joi.object({
    min: Joi.number().required(),
    max: Joi.number().required(),
  }).required(),
  maxOrdersPerSlot: Joi.number().required(),
});

const validateDish = (data) => schema.validate(data, { abortEarly: false });

export default validateDish;
