import createHttpError from "http-errors";
import { getCartHelper } from "../../../utils/helpers/getCart.js";
import Cart from "../../../models/cart.js";
import Dish from "../../../models/dish.js";
import validateAddToCart from "../../../utils/joi/customer/cart/validateCart.js";

const addToCart = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    throw createHttpError.Unauthorized("User not authenticated");
  }
  const { id, quantity } = req.body;
  const { error } = validateAddToCart.validate(req.body);
  if (error) throw createHttpError.BadRequest(error.details[0].message);

  const dish = await Dish.findById(id);
  if (!dish) throw createHttpError.NotFound("Dish not found");
  const cart = await getCartHelper(userId);
  if (cart) {
    if (!cart.vendor) {
      cart.vendor = dish.vendor._id;
    } else if (cart.vendor.toString() !== dish.vendor.toString()) {
      throw createHttpError.BadRequest(
        "Cart contains items from a different vendor. Please clear the cart first."
      );
    }

    const existingItem = cart.items.find((item) => item.dish.toString() === id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ dish: id, quantity });
    }

    await cart.save();
  } else {
    cart = new Cart({
      customer: customer._id,
      vendor: dish.vendor._id,
      items: [{ dish: id, quantity }],
    });

    await cart.save();
  }

  res.status(200).json({ message: "Dish added to cart", cart });
};

export default addToCart;
