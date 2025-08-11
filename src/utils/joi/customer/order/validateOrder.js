import Joi from "joi";
import objectId from "../../helpers/objectId.js";

const validateOrder = (data) => {
  const schema = Joi.object({
    customer: Joi.string().custom(objectId).required(),
    vendor: Joi.string().custom(objectId).required(),

    dishes: Joi.array()
      .items(
        Joi.object({
          dish: Joi.string().custom(objectId).required(),
          quantity: Joi.number().integer().min(1).required(),
        })
      )
      .min(1)
      .required(),

    totalPrice: Joi.number().min(0).required(),

    pickupSlot: Joi.string().custom(objectId).required(),

    orderStatus: Joi.string()
      .valid(
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled"
      )
      .optional(),

    paymentStatus: Joi.string().valid("pending", "paid", "failed").optional(),

    deliveryAddress: Joi.string().min(5),

    customerNote: Joi.string().max(500).allow("", null),

    paymentMethod: Joi.string().valid("stripe", "cash", "paypal").required(),
  });

  return schema.validate(data);
};
export default validateOrder;
