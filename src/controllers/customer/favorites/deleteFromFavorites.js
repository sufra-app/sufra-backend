import { Customer } from "../../../models/customer.js"
import createHttpError from "http-errors";
import mongoose from "mongoose";

const deleteFromFavorites = (type) => async (req, res) => {
  const userId = req.user?.id;
  const { id } = req.params;

  if (!userId) throw createHttpError.Unauthorized("User not authenticated");
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError.BadRequest(`Invalid ${type} ID`);
  }

  const customer = await Customer.findOne({ user: userId });
  if (!customer) throw createHttpError.NotFound("Customer not found");

  const field = type === "dish" ? "favoriteDishes" : "favoriteVendors";

  const index = customer[field].findIndex((itemId) => itemId.toString() === id);
  if (index === -1) {
    return res.status(404).json({ message: `${type} not found in favorites` });
  }

  customer[field].splice(index, 1);
  await customer.save();
  res.status(200).json({ message: `${type} removed from favorites` });
};
export default deleteFromFavorites;