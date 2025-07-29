import PickupSlot from "../../../models/pickupSlot.js";
import createHttpError from "http-errors";

export const getAllPickupSlotsController = async (req, res) => {
  const pickupSlots = await PickupSlot.find()
    .populate("vendor", "businessName");
  if (!pickupSlots || pickupSlots.length === 0) {
    throw createHttpError.NotFound("No pickupSlots found");
  }
  res.status(200).json({
    success: true,
    message: "pickupSlots got successfully",
    pickupSlots,
  });
};

export const getPickupSlotByIdController = async (req, res) => {
  const { id } = req.params;
  const pickupSlot = await PickupSlot.findById(id).populate("vendor", "businessName");
  if (!pickupSlot) {
    throw createHttpError.NotFound("pickupSlot not found");
  }
  res.status(200).json({
    success: true,
    message: "pickupSlot got successfully",
    pickupSlot,
  });
};
