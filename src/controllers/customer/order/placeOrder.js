import Order from "../../../models/order.js";
import createHttpError from "http-errors";
import validateOrder from "../../../utils/joi/customer/order/validateOrder.js";

const placeOrder = async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) throw createHttpError.BadRequest(error.details[0].message);

  const newOrder = new Order({
   ...req.body,
  });
  console.log(newOrder);

  await newOrder.save();

  res.status(201).json({
    message: "Order placed successfully",
    order: newOrder,
  });
};

export default placeOrder;
