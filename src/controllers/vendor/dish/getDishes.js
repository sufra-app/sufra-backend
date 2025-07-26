import Dish from "../../../models/dish.js";
import createHttpError from "http-errors";

export const getAllDishesController = async (req, res) => {
  const dishes = await Dish.find().populate("vendor", "businessName");
  if (!dishes || dishes.length === 0) {
    throw createHttpError.NotFound("No dishes found");
  }
  res.status(200).json({
    success: true,
    message: "Dish deleted successfully",
    dishes,
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
