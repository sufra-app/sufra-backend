import { Vendor } from "../../../models/vendor.js";
import Dish from "../../../models/dish.js";
import createHttpError from "http-errors";
import { getPagination } from "../../../utils/pagination.js";

export const getAllVendorsController = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const { businessName, latitude, longitude } = req.query;
  const filter = {};
  if (latitude !== undefined && longitude !== undefined) {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid latitude or longitude" });
    }

    filter.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: 50000,
      },
    };
  }

  if (businessName) {
    filter.businessName = { $regex: businessName, $options: "i" };
  }
  const totalVendors = (await Vendor.find(filter)).length;
  const totalPages = Math.ceil(totalVendors / limit);

  const vendors = await Vendor.find(filter)
    .select("businessName logo bio location")
    .populate("user", "name")
    .skip(skip)
    .limit(limit);

  if (!vendors.length) {
    return res
      .status(404)
      .json({ success: false, message: "No vendors found." });
  }

  res.status(200).json({
    success: true,
    message: "Vendors retrieved successfully",
    vendors,
    totalPages,
    page: page,
    totalVendors,
  });
};

export const getVendorByIdController = async (req, res) => {
  const { id } = req.params;

  const vendor = await Vendor.findById(id);
  if (!vendor) {
    throw createHttpError.NotFound("Vendor not found");
  }

  const dishes = await Dish.find({ vendor: id });

  res.status(200).json({
    success: true,
    message: "Vendor retrieved successfully",
    vendor,
    dishes,
  });
};
