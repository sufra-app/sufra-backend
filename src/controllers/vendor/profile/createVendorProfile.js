import { Vendor } from "../../../models/vendor.js";
import { User } from "../../../models/user.js";
import createHttpError from "http-errors";
import validateVendor from "../../../utils/joi/vendor/profile/validateVendor.js";

const createVendorProfileController = async (req, res) => {
  const { error } = validateVendor.validate(req.body);
  if (error) throw createHttpError.BadRequest(error.details[0].message);

  const user = await User.findById(req.user._id);
  if (!user) throw createHttpError.NotFound("User not found");

  const existingVendor = await Vendor.findOne({ user: req.user._id });
  if (existingVendor) {
    throw createHttpError.Conflict("Vendor profile already exists.");
  }

  const vendor = new Vendor({
    user: req.user._id,
    ...req.body,
    isProfileComplete: true,
  });

  await vendor.save();

  res.status(201).json({
    success: true,
    message: "Vendor profile created.",
    vendor,
  });
};

export default createVendorProfileController;
