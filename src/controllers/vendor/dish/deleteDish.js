import createHttpError from "http-errors";
import Dish from "../../../models/dish.js";
const deleteDishByIdController = async (req, res) => {
  const { id } = req.params;

  const deletedDish = await Dish.findByIdAndDelete(id);
  if (!deletedDish) {
    throw createHttpError.NotFound("Dish not found");
  }
  res.status(200).json({
    success: true,
    message: "Dish deleted successfully",
  });
};
export default deleteDishByIdController;
