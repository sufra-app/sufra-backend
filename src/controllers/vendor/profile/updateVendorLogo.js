import { Vendor } from "../../../models/vendor.js";
import createHttpError from "http-errors";
import validateLogo from "../../../utils/joi/vendor/profile/validateLogo.js";

const updateVendorLogoController = async (req, res) => {
  console.log("Update Vendor Logo Controller");
  const { error } = validateLogo.validate(req.body);
  if (error) {
    throw createHttpError.BadRequest(error.details[0].message);
  }
  const { logoUrl } = req.body;
  const userId = req.user._id;
  console.log(logoUrl, userId);
  if (!logoUrl) {
    throw createHttpError.BadRequest({ error: "Logo URL is required" });
  }

  const updatedVendor = await Vendor.findOneAndUpdate(
    { user: userId },
    { logo: logoUrl },
    { new: true, runValidators: true }
  );
  console.log("Updated Vendor:", updatedVendor);
  if (!updatedVendor) {
    throw createHttpError.Unauthorized({ error: "Vendor not found" });
  }

  res.status(201).json({
    message: "Vendor logo updated successfully",
    vendor: updatedVendor,
  });
};
export default updateVendorLogoController;
