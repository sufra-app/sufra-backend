import Order from "../../../models/order.js";
import { Vendor } from "../../../models/vendor.js";
import createHttpError from "http-errors";
import validateUpdateOrderStatus from "../../../utils/joi/vendor/order/validateUpdateOrderStatus.js";

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id;

  // Validate request body
  const { error } = validateUpdateOrderStatus(req.body);
  if (error) {
    throw createHttpError.BadRequest(error.details[0].message);
  }

  // Capitalize first character and lowercase the rest
  let orderStatus = req.body.orderStatus;
  orderStatus =
    orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1).toLowerCase();

  // Find vendor by user ID
  const vendor = await Vendor.findOne({ user: userId });
  if (!vendor) {
    throw createHttpError.NotFound("Vendor profile not found");
  }

  // Get order and verify it belongs to the vendor
  const order = await Order.findOne({
    _id: orderId,
    vendor: vendor._id,
  });

  if (!order) {
    throw createHttpError.NotFound("Order not found");
  }

  // Validate status transition
  const validStatuses = [
    "Pending",
    "Confirmed",
    "Preparing",
    "ReadyForPickup",
    "Completed",
    "Cancelled",
  ];

  if (!validStatuses.includes(orderStatus)) {
    throw createHttpError.BadRequest("Invalid order status");
  }

  // Check if status transition is valid
  const statusFlow = {
    Pending: ["Confirmed", "Cancelled"],
    Confirmed: ["Preparing", "Cancelled"],
    Preparing: ["ReadyForPickup", "Cancelled"],
    ReadyForPickup: ["Completed"],
    Completed: [], // Final state
    Cancelled: [], // Final state
  };

  if (orderStatus === "Cancelled") {
    const cancellableStatuses = ["Pending", "Confirmed", "Preparing"];
    if (!cancellableStatuses.includes(order.orderStatus)) {
      throw createHttpError.BadRequest(
        `Order cannot be cancelled from status: ${order.orderStatus}. 
        Only orders with status Pending, Confirmed, or Preparing can be cancelled.`
      );
    }
  }

  // Check if status transition is valid
  if (
    order.orderStatus !== orderStatus &&
    !statusFlow[order.orderStatus]?.includes(orderStatus)
  ) {
    throw createHttpError.BadRequest(
      `Cannot change order status from ${order.orderStatus} to ${orderStatus}`
    );
  }

  // Update order status
  order.orderStatus = orderStatus;
  await order.save();

  // Populate before sending response
  await order.populate([
    {
      path: "customer",
      select: "user",
      populate: {
        path: "user",
        select: "name email",
      },
    },
    {
      path: "dishes.dish",
      select: "name price",
    },
    {
      path: "pickupSlot",
      select: "day startTime endTime maxOrders currentOrders",
    },
  ]);

  res.json({
    success: true,
    message: "Order status updated successfully",
    order,
  });
};

export default updateOrderStatus;
