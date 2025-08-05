import Joi from "joi";
import objectId from "../../helpers/objectId.js";

const validateUpdateCustomer = Joi.object({
  address: Joi.string().min(5).optional(),
  profileImage: Joi.string().uri().optional(),
  location: Joi.object({
  type: Joi.string().valid("Point").required(),
  coordinates: Joi.array()
    .items(Joi.number()) 
    .length(2)
    .required(),
}).optional(),
  favoriteVendors: Joi.array().items(objectId).optional(),
  favoriteDishes: Joi.array().items(objectId).optional(),
  savedDishes: Joi.array().items(objectId).optional(),
});

export default validateUpdateCustomer;
