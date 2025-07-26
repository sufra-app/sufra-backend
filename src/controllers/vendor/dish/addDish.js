import Dish from "../../../models/dish.js";
import createHttpError from "http-errors";
import validateDish from "../../../utils/joi/vendor/dish/validateDish.js";
const addDishController = async (req, res) => {
  const vendorId = req.user.id;
  const { error } = validateDish(req.body);
  if (error) throw createHttpError.BadRequest(error.details[0].message);
  const {
    name,
    description,
    photo,
    price,
    category,
    dietaryRestrictions,
    preparationTime,
    maxOrdersPerSlot,
  } = req.body;

  const newDish = new Dish({
    vendor: vendorId,
    name,
    description,
    photo,
    price,
    category,
    dietaryRestrictions: dietaryRestrictions,
    preparationTime,
    maxOrdersPerSlot,
  });

  const savedDish = await newDish.save();
  res.status(201).json(savedDish);
};

export default addDishController;
