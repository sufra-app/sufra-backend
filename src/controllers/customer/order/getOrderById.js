import Order from "../../../models/order.js";
import { Customer } from "../../../models/customer.js";
import createHttpError from "http-errors";

const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id;

  // Find customer by user ID
  const customer = await Customer.findOne({ user: userId });
  if (!customer) {
    throw createHttpError.NotFound("Customer profile not found");
  }

  // Get order and verify it belongs to the customer
  const order = await Order.findOne({
    _id: orderId,
    customer: customer.id,
  })
    .populate("vendor", "businessName logo address cuisineType description")
    .populate("dishes.dish", "name price image description")
    .populate("pickupSlot", "day startTime endTime maxOrders currentOrders");

  if (!order) {
    throw createHttpError.NotFound("Order not found");
  }

  res.json({
    success: true,
    order,
  });
};

export default getOrderById;
