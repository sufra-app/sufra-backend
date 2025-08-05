import { Customer } from "../../../models/customer.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";

const addToFavorites = (type) => async (req, res) => {
  const userId = req.user?.id;
  const { id } = req.body;

  if (!userId) throw createHttpError.Unauthorized("User not authenticated");
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError.BadRequest(`Invalid ${type} ID`);
  }

  const customer = await Customer.findOne({ user: userId });
  if (!customer) throw createHttpError.NotFound("Customer not found");

  const field = type === "dish" ? "favoriteDishes" : "favoriteVendors";

  const alreadyExists = customer[field].some(
    (itemId) => itemId.toString() === id
  );
  if (alreadyExists) {
    return res.status(200).json({ message: `${type} already in favorites` });
  }

  customer[field].push(id);
  await customer.save();
  res.status(200).json({ message: `${type} added to favorites` });
};
export default addToFavorites;
