import Dish from "../../../models/dish.js";
import createHttpError from "http-errors";
import { getPagination } from "../../../utils/helpers/pagination.js";

export const getAllDishesController = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const { category, dishName } = req.query;

  const filter = {};
  if (dishName) {
    filter.name = { $regex: dishName, $options: "i" };
  }
  if (category) {
    const allowedCategories = [
      "appetizer",
      "main course",
      "dessert",
      "drink",
      "salad",
      "soup",
      "snack",
    ];

    if (!allowedCategories.includes(category.toLowerCase())) {
      throw createHttpError.BadRequest("Invalid category value.");
    }

    filter.category = category.toLowerCase();
  }

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
