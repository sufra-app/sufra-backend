import { getCartHelper } from "../../../utils/helpers/getCart.js";
const clearCart = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    throw createHttpError.Unauthorized("User not authenticated");
  }
  const cart = await getCartHelper(userId);
  cart.items = [];
  cart.vendor = undefined;

  await cart.save();
  res.status(200).json({
    message: "Cart Cleard",
    cart,
  });
};

export default clearCart;
