import mongoose from "mongoose";

//every dish schema

const orderItemSchema = new mongoose.Schema(
  {
    dish: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    // I added it for : Snapshot of the price to prevent price changes from affecting past orders
    priceAtOrder: {
      type: Number,
      required: true,
    },
    dishName: {
      type: String,
    },
  },
  { _id: false }
);

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
    dishes: [orderItemSchema],
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
    paymentMethod: {
      type: String,
      enum: ["stripe", "cash"],
      required: true,
    },
    // 4. Payment Proof (STRIPE INTEGRATION)
    paymentStatus: {
      type: String,
      enum: ["succeeded", "pending", "failed", "canceled"],
      default: "pending",
      required: true,
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    paymentMethodId: {
      type: String,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Preparing",
        "ReadyForPickup",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    placedAt: {
      type: Date,
      default: Date.now,
    },
    customerNote: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
