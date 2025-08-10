import { Customer } from "../../models/customer.js";
import createHttpError from "http-errors";
import Cart from "../../models/cart.js";
export const getCartHelper = async (userId) => {
  const customer = await Customer.findOne({ user: userId });
  if (!customer) throw createHttpError.NotFound("Customer not found");

  const cart = await Cart.findOne({ customer: customer._id });
  if (!cart) throw createHttpError.NotFound("Cart not found");

  return cart;
};
