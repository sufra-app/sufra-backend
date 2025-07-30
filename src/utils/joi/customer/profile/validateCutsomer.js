import Joi from "joi";
import objectId from "../../helpers/objectId.js";

const validateCustomer = Joi.object({
  address: Joi.string().min(5).required(),
  profileImage: Joi.string().uri().optional(),
  location: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }).required(),
  favoriteVendors: Joi.array().items(objectId).optional(),
  favoriteDishes: Joi.array().items(objectId).optional(),
  savedDishes: Joi.array().items(objectId).optional(),
});

export default validateCustomer;
