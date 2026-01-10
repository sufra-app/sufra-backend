import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import checkRole from "../../middlewares/checkRole.js";
import {
  getPickupSlots,
  payForProduct,
  getCustomerOrders,
  getOrderById,
  cancelOrder,
} from "../../controllers/customer/order/index.js";

const router = express.Router();

router.use(authMiddleware, checkRole("Customer"));

// Get pickup slots
router.get("/pickupSlots/:vendorId", getPickupSlots);

// Payment and order placement
router.post("/payment/checkout", payForProduct);

// Order management
// GET /api/customer/order?status=Pending&page=1&limit=10
router.get("/", getCustomerOrders);

// GET /api/customer/order/:orderId
router.get("/:orderId", getOrderById);

// PATCH /api/customer/order/:orderId/cancel
router.patch("/:orderId/cancel", cancelOrder);

export default router;
