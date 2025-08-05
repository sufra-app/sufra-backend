import createHttpError from "http-errors";
import Dish from "../../../models/dish.js";
import { Vendor } from "../../../models/vendor.js";

const deleteDishByIdController = async (req, res) => {
  const { id } = req.params;
  const dish = await Dish.findOne({ _id: id, vendor: vendor._id });
  if (!dish) {
    throw createHttpError.NotFound("Dish not found or unauthorized");
  }
  await Dish.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Dish deleted successfully",
  });
};

export default deleteDishByIdController;
