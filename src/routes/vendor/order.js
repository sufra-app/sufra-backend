import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import checkRole from "../../middlewares/checkRole.js";
import {
  getVendorOrders,
  getVendorOrderById,
  updateOrderStatus,
} from "../../controllers/vendor/order/index.js";

const router = express.Router();

router.use(authMiddleware, checkRole("Vendor"));

// Order management
// GET /api/vendor/order?status=Pending&page=1&limit=10
router.get("/", getVendorOrders);

// GET /api/vendor/order/:orderId
router.get("/:orderId", getVendorOrderById);

// PATCH /api/vendor/order/:orderId/status
router.patch("/:orderId/status", updateOrderStatus);

export default router;
