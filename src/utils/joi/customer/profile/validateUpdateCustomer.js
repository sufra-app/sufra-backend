import Joi from "joi";
import objectId from "../../helpers/objectId.js";

const validateUpdateCustomer = Joi.object({
  address: Joi.object({
    street: Joi.string().trim().required().messages({
      "any.required": "Street address is required.",
      "string.empty": "Street address cannot be empty.",
    }),
    city: Joi.string().trim().required().messages({
      "any.required": "City is required.",
      "string.empty": "City cannot be empty.",
    }),
    state: Joi.string().trim().optional().allow(null, ""),
    zipCode: Joi.string().trim().optional().allow(null, ""),
    country: Joi.string().trim().optional().allow(null, ""),
  }).optional(),
  profileImage: Joi.string().uri().optional(),
  location: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
  }).optional(),
  favoriteVendors: Joi.array().items(objectId).optional(),
  favoriteDishes: Joi.array().items(objectId).optional(),
  savedDishes: Joi.array().items(objectId).optional(),
});

export default validateUpdateCustomer;
