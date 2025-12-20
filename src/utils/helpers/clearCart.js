import { getCartHelper } from "./getCart.js";

const clearCartHelper = async (userId) => {
  const cart = await getCartHelper(userId);
  if (!cart) return null;

  cart.dishes = [];
  cart.vendor = undefined;

  await cart.save();
  return cart;
};

export default clearCartHelper;
