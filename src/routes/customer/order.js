import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import checkRole from "../../middlewares/checkRole.js";
import {
  getPickupSlots,
  placeOrder,
  payForProduct
} from "../../controllers/customer/order/index.js";

const router = express.Router();

router.use(authMiddleware, checkRole("Customer"));
router.get("/pickupSlots/:vendorId", getPickupSlots);
router.post('/payment/checkout',payForProduct);
router.post("/place", placeOrder);
// router.put("/clear", clearCart);

export default router;
