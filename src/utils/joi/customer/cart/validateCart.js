import Joi from "joi";
import objectId from "../../helpers/objectId.js";

const validateAddToCart = Joi.object({
  id: Joi.string().custom(objectId).required(),
  quantity: Joi.number().integer().min(1).required(),
});

export default validateAddToCart;
