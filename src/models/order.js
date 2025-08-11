import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    dishes: [
      {
        dish: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dish",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    pickupSlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PickupSlot",
      required: true,
    },
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["stripe", "cash", "paypal"],
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    customerNote: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
