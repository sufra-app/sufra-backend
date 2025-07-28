import Dish from "../../../models/dish.js";
import createHttpError from "http-errors";
import validateDish from "../../../utils/joi/vendor/dish/validateDish.js";
import { Vendor } from "../../../models/vendor.js";
const addDishController = async (req, res) => {
  const { error } = validateDish(req.body);
  if (error) throw createHttpError.BadRequest(error.details[0].message);
  
  const vendor = await Vendor.findOne({ user: req.user.id });
  if (!vendor) throw createHttpError.NotFound("Vendor not found");

  const newDish = new Dish({
    vendor: vendor._id,
    ...req.body,
  });
  const savedDish = await newDish.save();
  res.status(201).json(savedDish);
};

export default addDishController;
