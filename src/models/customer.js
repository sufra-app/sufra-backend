import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String, required: true },
    profileImage: { type: String },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    favoriteVendors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }],
    favoriteDishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
    savedDishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
    isProfileComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export { Customer };
