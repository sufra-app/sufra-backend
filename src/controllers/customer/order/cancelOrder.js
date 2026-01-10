import Order from "../../../models/order.js";
import { Customer } from "../../../models/customer.js";
import createHttpError from "http-errors";

const cancelOrder = async (req, res) => {
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
  });

  if (!order) {
    throw createHttpError.NotFound("Order not found");
  }

  // Check if order can be cancelled
  const cancellableStatuses = ["Pending", "Confirmed"];
  if (!cancellableStatuses.includes(order.orderStatus)) {
    throw createHttpError.BadRequest(
      `Order cannot be cancelled. Current status: ${order.orderStatus}`
    );
  }

  // Update order status
  order.orderStatus = "Cancelled";
  await order.save();

  res.json({
    success: true,
    message: "Order cancelled successfully",
    order,
  });
};

export default cancelOrder;
