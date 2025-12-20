import Joi from "joi";
import objectId from "../../helpers/objectId.js";

const validateCustomer = Joi.object({
  address: Joi.object({
    street: Joi.string().trim().required().messages({
      "any.required": "Street address is required.",
      "string.empty": "Street address cannot be empty.",
    }),
    city: Joi.string().trim().required().messages({
      "any.required": "City is required.",
      "string.empty": "City cannot be empty.",
    }),
    state: Joi.string().trim().optional().allow(null, ""), // Optional state
    zipCode: Joi.string().trim().optional().allow(null, ""), // Optional zipcode
    country: Joi.string().trim().optional().allow(null, ""), //DEFAULT palestine
  }).required(),
  profileImage: Joi.string().uri().optional(),
  location: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array()
      .items(
        //  Longitude (lng). Must be between -180 and 180.
        Joi.number().min(-180).max(180).required(),
        // Latitude (lat). Must be between -90 and 90.
        Joi.number().min(-90).max(90).required()
      )
      .length(2)
      .required()
      .messages({
        "array.includesRequiredKnowns":
          "Coordinates array must be [Longitude, Latitude] with valid geographical boundaries.",
      }),
  }).required(),
  favoriteVendors: Joi.array().items(objectId).optional(),
  favoriteDishes: Joi.array().items(objectId).optional(),
  savedDishes: Joi.array().items(objectId).optional(),
});

export default validateCustomer;
