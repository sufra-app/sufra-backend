import createHttpError from "http-errors";
import mongoose from "mongoose";
import {getCartHelper} from "../../../utils/helpers/getCart.js";
const deleteFromCart = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    throw createHttpError.Unauthorized("User not authenticated");
  }
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError.BadRequest("Invalid dish ID");
  }
  const cart = await getCartHelper(userId);

  console.log(cart);
  if (!cart) {
    throw createHttpError.NotFound("Cart not found");
  }

  const updatedItems = cart.items.filter((item) => item.dish.toString() !== id);

  console.log(updatedItems);
  cart.items = updatedItems;

  if (updatedItems.length === 0) {
    cart.vendor = undefined;
    console.log("pk");
  }

  await cart.save();
  console.log("pk");

  res.status(200).json({
    message: "Dish removed from cart",
    cart,
  });
};

export default deleteFromCart;
