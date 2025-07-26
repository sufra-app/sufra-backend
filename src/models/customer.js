import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    isProfileComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export { Customer };
