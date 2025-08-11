import PickupSlot from "../../../models/pickupSlot.js";
import createHttpError from "http-errors";

const getPickupSlots = async (req, res) => {
  const { vendorId } = req.params;
  console.log(vendorId);
  if (!vendorId) {
    throw createHttpError.BadRequest("Vendor ID is required");
  }

  const slots = await PickupSlot.find({ vendor: vendorId }).populate(
    "vendor",
    "name location"
  );

  if (!slots || slots.length === 0) {
    throw createHttpError.NotFound("No pickup slots found for this vendor");
  }

  res.status(200).json({
    message: "Pickup slots retrieved successfully",
    slots,
  });
};

export default getPickupSlots;
