import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String, required: true },
    profileImage: { type: String },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
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
