import Dish from "../../../models/dish.js";
import createHttpError from "http-errors";
import { getPagination } from "../../../utils/pagination.js";
import { Vendor } from "../../../models/vendor.js";

export const getVendorDishesController = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const userId = req.user._id;
  const vendorId = await Vendor.findOne({ user: userId }).select("_id");
  const filter = { vendor: vendorId };
  const totalDishes = await Dish.countDocuments(filter);
  const totalPages = Math.ceil(totalDishes / limit);

  const dishes = await Dish.find(filter)
    .populate("vendor", "businessName")
    .skip(skip)
    .limit(limit);

  if (!dishes || dishes.length === 0) {
    throw createHttpError.NotFound("No dishes found");
  }
  res.status(200).json({
    success: true,
    message: "Dishes retrieved successfully",
    dishes,
    totalPages,
    page,
    totalDishes,
  });
};

export const getDishByIdController = async (req, res) => {
  const { id } = req.params;
  const dish = await Dish.findById(id).populate("vendor", "businessName");
  if (!dish) {
    throw createHttpError.NotFound("Dish not found");
  }
  res.status(200).json({
    success: true,
    message: "Dish got successfully",
    dish,
  });
};
