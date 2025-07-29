import validatePickupSlot from "../../../utils/joi/vendor/pickupSlots/vaidatePickupSlot.js";
import createHttpError from "http-errors";
import { Vendor } from "../../../models/vendor.js";
import PickupSlot from "../../../models/pickupSlot.js";
const createPickupSlotController = async (req, res) => {
  if (req.body.day) {
    req.body.day =
      req.body.day.charAt(0).toUpperCase() +
      req.body.day.slice(1).toLowerCase();
  }
  const { error } = validatePickupSlot(req.body);
  if (error) throw createHttpError.BadRequest(error.details[0].message);

  if (!req.user?.id)
    throw createHttpError.Unauthorized("User not authenticated");

  const vendor = await Vendor.findOne({ user: req.user._id });
  if (!vendor) throw createHttpError.NotFound("Vendor not found");


  const existingSlot = await PickupSlot.findOne({
    vendor: vendor._id,
    day: req.body.day,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });

  if (existingSlot) {
    throw createHttpError.Conflict("Pickup slot already exists for this time.");
  }

  const newSlot = await PickupSlot.create({
    vendor: vendor._id,
    ...req.body,
    currentOrders: 0,
  });

  res.status(201).json({
    success: true,
    message: "Pickup slot created successfully",
    slot: newSlot,
  });
};

export default createPickupSlotController;
