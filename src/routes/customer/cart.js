import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import checkRole from "../../middlewares/checkRole.js";
import {
  addToCart,
  deleteFromCart,
  clearCart,
  getCartController
} from "../../controllers/customer/cart/index.js";

const router = express.Router();

router.use(authMiddleware, checkRole("Customer"));
router.post("/add", addToCart);
router.delete("/delele/:id", deleteFromCart);
router.get("/details",getCartController);
router.put("/clear", clearCart);

export default router;
