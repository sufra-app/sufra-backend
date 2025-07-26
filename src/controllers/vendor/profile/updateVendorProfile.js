import createHttpError from "http-errors";
import { Vendor } from "../../../models/vendor.js";
import validateUpdateVendor from "../../../utils/joi/vendor/profile/validateUpdateVendor.js";

const updateVendorProfileController = async (req, res) => {
  const { error } = validateUpdateVendor.validate(req.body);
  if (error) throw createHttpError.BadRequest(error.details[0].message);
  const updates = req.body;
  const userId = req.user._id;

  const vendor = await Vendor.findOneAndUpdate(
    { user: userId },
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!vendor) {
    throw createHttpError.NotFound("Vendor profile not found.");
  }

  res.status(200).json({
    success: true,
    message: "Vendor profile updated successfully.",
    vendor,
  });
};

export default updateVendorProfileController;
