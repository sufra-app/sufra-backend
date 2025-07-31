import { Vendor } from "../../../models/vendor.js";
import createHttpError from "http-errors";
import { getPagination } from "../../../utils/pagination.js";

export const getAllVendorsController = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const { businessName } = req.query;
  const filter = {};
  if (businessName) {
    filter.businessName = { $regex: businessName, $options: "i" };
  }
  const totalVendors = await Vendor.countDocuments(filter);
  const totalPages = Math.ceil(totalVendors / limit);

  const vendors = await Vendor.find(filter)
    .select("businessName logo bio location")
    .populate("user", "name")
    .skip(skip)
    .limit(limit);

  if (!vendors || vendors.length === 0) {
    throw createHttpError.NotFound("No vendors found.");
  }

  res.status(200).json({
    success: true,
    message: "Vendors retrieved successfully",
    vendors,
    totalPages,
    page,
    totalVendors,
  });
};

export const getVendorByIdController = async (req, res) => {
  const { id } = req.params;
  const vendor = await Vendor.findById(id);
  if (!vendor) {
    throw createHttpError.NotFound("vendor not found");
  }
  res.status(200).json({
    success: true,
    message: "vendor got successfully",
    vendor,
  });
};
