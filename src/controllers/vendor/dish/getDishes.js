import Dish from "../../../models/dish.js";
import createHttpError from "http-errors";

export const getAllDishesController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const totalDishes = await Dish.countDocuments();
  const totalPages = Math.ceil(totalDishes / limit);
  const dishes = await Dish.find()
    .populate("vendor", "businessName")
    .skip(skip)
    .limit(limit);
  if (!dishes || dishes.length === 0) {
    throw createHttpError.NotFound("No dishes found");
  }
  res.status(200).json({
    success: true,
    message: "Dishes got successfully",
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
