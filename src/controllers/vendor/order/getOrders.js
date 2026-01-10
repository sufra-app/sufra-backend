import Order from "../../../models/order.js";
import { Vendor } from "../../../models/vendor.js";
import createHttpError from "http-errors";

const getVendorOrders = async (req, res) => {
  const userId = req.user._id;

  // Find vendor by user ID
  const vendor = await Vendor.findOne({ user: userId });
  if (!vendor) {
    throw createHttpError.NotFound("Vendor profile not found");
  }

  const { status, page = 1, limit = 10 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Build filter
  const filter = { vendor: vendor._id };
  if (status) {
    filter.orderStatus = status;
  }

  // Get orders with pagination
  const orders = await Order.find(filter)
    .populate({
      path: "customer",
      select: "user",
      populate: {
        path: "user",
        select: "name email",
      },
    })
    .populate("dishes.dish", "name price image")
    .populate("pickupSlot", "day startTime endTime maxOrders currentOrders")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const totalOrders = await Order.countDocuments(filter);

  res.json({
    success: true,
    orders,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: totalOrders,
      pages: Math.ceil(totalOrders / parseInt(limit)),
      status: status || null,
    },
  });
};

export default getVendorOrders;
