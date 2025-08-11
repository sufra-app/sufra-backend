import {Vendor} from "../../../models/vendor.js";
import Dish from "../../../models/dish.js";
const getVendorByIdController = async (req, res) => {
  const { id } = req.params;

  const vendor = await Vendor.findById(id);
  if (!vendor) {
    throw createHttpError.NotFound("Vendor not found");
  }

  const dishes = await Dish.find({ vendor: id });

  res.status(200).json({
    success: true,
    message: "Vendor retrieved successfully",
    vendor,
    dishes,
  });
};

export default getVendorByIdController;
