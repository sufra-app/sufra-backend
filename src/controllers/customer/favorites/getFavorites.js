import { Customer } from "../../../models/customer.js";
import createHttpError from "http-errors";

const getFavorites = (type) => async (req, res) => {
  const userId = req.user?.id;

  if (!userId) throw createHttpError.Unauthorized("User not authenticated");

  const field = type === "dish" ? "favoriteDishes" : "favoriteVendors";

  const customer = await Customer.findOne({ user: userId }).populate(field);
  if (!customer) throw createHttpError.NotFound("Customer not found");

  res.status(200).json({ favorites: customer[field] });
};
export default getFavorites;
