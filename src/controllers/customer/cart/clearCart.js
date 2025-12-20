import clearCartHelper from "../../../utils/helpers/clearCart.js";
import createHttpError from "http-errors";

const clearCart = async (req, res) => {
  const userId = req.user?.id; // Get ID from Auth Middleware

  if (!userId) {
    throw createHttpError.Unauthorized("User not authenticated");
  }

  // 1. Call the helper to do the work
  const clearedCart = await clearCartHelper(userId);

  if (!clearedCart) {
    throw createHttpError.NotFound("No cart found to clear.");
  }

  // 2. Send the HTTP response
  res.status(200).json({
    message: "Cart cleared successfully",
    cart: clearedCart,
  });
};

export default clearCart;
