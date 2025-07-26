import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    businessName: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    cuisineType: { type: String, required: true },
    logo: { type: String },
    workingDays: { type: [String], required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    isProfileComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);
export { Vendor };
