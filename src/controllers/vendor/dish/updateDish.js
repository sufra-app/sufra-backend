import  Dish  from "../../../models/dish.js";
import createHttpError from "http-errors";
export const updateDishByIdController = async (req, res) => {
  const { id } = req.params;

  const updatedDish = await Dish.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!updatedDish) {
    throw createHttpError.createHttpError.NotFound({ error: "Dish not found" });
  }

  res.status(200).json({
    success: true,
    message:"Dish updated successfully.",
    updatedDish,
  });
};
export default updateDishByIdController;