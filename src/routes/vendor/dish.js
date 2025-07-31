import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import checkRole from "../../middlewares/checkRole.js";
import {
  addDishController,
  getVendorDishesController,
  getDishByIdController,
  updateDishController,
  deleteDishByIdController,
} from "../../controllers/vendor/dish/index.js";
const router = express.Router();

router.use(authMiddleware, checkRole("Vendor"));
router.post("/add", addDishController);
router.put("/update/:id", updateDishController);
router.delete("/delete/:id", deleteDishByIdController);
router.get("/all", getVendorDishesController);
router.get("/:id", getDishByIdController);

export default router;
