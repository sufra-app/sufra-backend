import Joi from "joi";
import objectId from "../../helpers/objectId.js";

const orderItemSchema = Joi.object({
  dish: Joi.custom(objectId).required(),
  quantity: Joi.number().integer().min(1).required(),
  priceAtOrder: Joi.number().min(0).required(),
  dishName: Joi.string().optional().allow(null, ""),
});

const validateOrder = (data) => {
  const schema = Joi.object({
    customer: Joi.custom(objectId).required(),
    vendor: Joi.custom(objectId).required(),

    dishes: Joi.array().items(orderItemSchema).min(1).required(),
    totalPrice: Joi.number().min(0).required(),

    pickupSlot: Joi.string().custom(objectId).required(),
    customerNote: Joi.string().max(500).optional().allow("", null),

    paymentMethod: Joi.string().valid("stripe", "cash").required(),

    paymentStatus: Joi.string()
      .valid("succeeded", "pending", "failed", "canceled")
      .required(),
    paymentMethodId: Joi.string().required(),
    paymentIntentId: Joi.string().required(),
    orderStatus: Joi.string()
      .valid(
        "Pending",
        "Confirmed",
        "Preparing",
        "ReadyForPickup",
        "Completed",
        "Cancelled"
      )
      .default("Pending")
      .required(),

    placedAt: Joi.date().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    __v: Joi.number().optional(),
    _id: Joi.string().custom(objectId).optional(),
  });
  return schema.validate(data);
};

export default validateOrder;
