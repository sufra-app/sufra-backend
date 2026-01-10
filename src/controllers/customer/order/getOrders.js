import Order from "../../../models/order.js";
import { Customer } from "../../../models/customer.js";
import createHttpError from "http-errors";
import { getPagination } from "../../../utils/helpers/pagination.js";

const getCustomerOrders = async (req, res) => {
  const userId = req.user?.id;

  // Find customer by user ID
  const customer = await Customer.findOne({ user: userId });
  if (!customer) {
    throw createHttpError.NotFound("Customer profile not found");
  }

  const { status } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  // Build filter
  const filter = { customer: customer._id };
  if (status) {
    filter.orderStatus =
      status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  }

  // Get orders with pagination
  const orders = await Order.find(filter)
    .populate("vendor", "businessName logo address cuisineType")
    .populate("dishes.dish", "name price image")
    .populate("pickupSlot", "day startTime endTime maxOrders currentOrders")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalOrders = await Order.countDocuments(filter);

  res.json({
    success: true,
    orders,
    pagination: {
      page,
      limit,
      total: totalOrders,
      pages: Math.ceil(totalOrders / limit),
      status: status || null,
    },
  });
};

export default getCustomerOrders;
