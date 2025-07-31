import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import checkRole from "../../middlewares/checkRole.js";
import {
  getAllDishesController,
  getDishByIdController,
} from "../../controllers/customer/home/getAllDishes.js";
import {
  getAllVendorsController,
  getVendorByIdController,
} from "../../controllers/customer/home/getAllVendors.js";
const router = express.Router();

router.use(authMiddleware, checkRole("Customer"));

router.get("/dishes", getAllDishesController);
router.get("/dish/:id", getDishByIdController);
router.get("/vendors", getAllVendorsController);
router.get("/vendor/:id", getVendorByIdController);

export default router;
