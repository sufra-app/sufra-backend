import mongoose from "mongoose";

const pickupSlotSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
  },
  startTime: {
    type: String, 
    required: true,
  },
  endTime: {
    type: String, 
    required: true,
  },
  maxOrders: {
    type: Number,
    default: 10,
  },
  currentOrders: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
});

const PickupSlot = mongoose.model("PickupSlot", pickupSlotSchema);

export default PickupSlot;
