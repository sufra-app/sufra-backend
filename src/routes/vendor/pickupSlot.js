import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import checkRole from "../../middlewares/checkRole.js";
import {
  createPickupSlotController,
  updatePickupSlotController,
  deletPickupSlotByIdController,
  getAllPickupSlotsController,
  getPickupSlotByIdController,
} from "../../controllers/vendor/pickupSlot/index.js";
const router = express.Router();
router.use(authMiddleware, checkRole("Vendor"));
router.post("/create", createPickupSlotController);
router.put("/update/:id", updatePickupSlotController);
router.delete("/delete/:id", deletPickupSlotByIdController);
router.get("/all", getAllPickupSlotsController);
router.get("/:id", getPickupSlotByIdController);

export default router;
