import mongoose from "mongoose";

const dishSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "appetizer",
        "main course",
        "dessert",
        "drink",
        "salad",
        "soup",
        "snack",
      ],
    },
    dietaryRestrictions: {
      type: [String],
      default: ["any"],
    },
    preparationTime: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    maxOrdersPerSlot: {
      type: Number,
      required: true,
    },
    // ratings: {
    //   average: { type: Number, default: 0 },
    //   totalReviews: { type: Number, default: 0 },
    // },
    // reviews: [
    //   {
    //     customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    //     rating: { type: Number, required: true },
    //     comment: { type: String },
    //     createdAt: { type: Date, default: Date.now },
    //   },
    // ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Dish = mongoose.model("Dish", dishSchema);
export default Dish;
