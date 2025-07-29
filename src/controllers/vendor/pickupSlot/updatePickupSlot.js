import createHttpError from "http-errors";
import PickupSlot from "../../../models/pickupSlot.js";
import { Vendor } from "../../../models/vendor.js";
import validateUpdatePickupSlot from "../../../utils/joi/vendor/pickupSlots/validateUpdatePickupSlot.js";

const updatePickupSlotController = async (req, res) => {
  if (req.body.day) {
    req.body.day =
      req.body.day.charAt(0).toUpperCase() + req.body.day.slice(1).toLowerCase();
  }

  const { error } = validateUpdatePickupSlot.validate(req.body);
  if (error) throw createHttpError.BadRequest(error.details[0].message);

  const updates = req.body;

  if (!req.user?.id)
    throw createHttpError.Unauthorized("User not authenticated");

  const vendor = await Vendor.findOne({ user: req.user._id });
  if (!vendor) throw createHttpError.NotFound("Vendor not found");

  const { slotId } = req.params;

  const pickupSlot = await PickupSlot.findOneAndUpdate(
    { _id: slotId, vendor: vendor._id },
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!pickupSlot) {
    throw createHttpError.NotFound("Pickup slot not found.");
  }

  res.status(200).json({
    success: true,
    message: "Pickup slot updated successfully.",
    pickupSlot,
  });
};

export default updatePickupSlotController;
