import createHttpError from "http-errors";
import PickupSlot from "../../../models/pickupSlot.js";
const deletPickupSlotByIdController = async (req, res) => {
  const { id } = req.params;
  const deletedPickupSlot = await PickupSlot.findByIdAndDelete(id);
  if (!deletedPickupSlot) {
    throw createHttpError.NotFound("PickupSlot not found");
  }
  res.status(200).json({
    success: true,
    message: "PickupSlot deleted successfully",
  });
};
export default deletPickupSlotByIdController;
