import Order from "../../../models/order.js";
import { Vendor } from "../../../models/vendor.js";
import createHttpError from "http-errors";

const getVendorOrderById = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user._id;

  // Find vendor by user ID
  const vendor = await Vendor.findOne({ user: userId });
  if (!vendor) {
    throw createHttpError.NotFound("Vendor profile not found");
  }

  // Get order and verify it belongs to the vendor
  const order = await Order.findOne({
    _id: orderId,
    vendor: vendor._id,
  })
    .populate({
      path: "customer",
      select: "user address",
      populate: {
        path: "user",
        select: "name email phoneNumber",
      },
    })
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

export default getVendorOrderById;
