import Joi from "joi";

const validateUpdateOrderStatus = (data) => {
  const schema = Joi.object({
    orderStatus: Joi.string()
      .valid(
        "Pending",
        "Confirmed",
        "Preparing",
        "ReadyForPickup",
        "Completed",
        "Cancelled"
      )
      .required()
      .messages({
        "any.only": "Order status must be one of: Pending, Confirmed, Preparing, ReadyForPickup, Completed, Cancelled",
        "any.required": "Order status is required"
      })
  });

  return schema.validate(data);
};

export default validateUpdateOrderStatus;







