import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: {
      street: { type: String, required: true }, // Corresponds to Stripe's line1
      city: { type: String, required: true },
      state: { type: String },
      zipCode: { type: String, required: false },// Corresponds to Stripe's postal_code
      country: { type: String, default: "Palestine" },
    },
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
