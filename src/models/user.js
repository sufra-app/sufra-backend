import mongoose from "mongoose";
import signToken from "../utils/jwt/signToken.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationCode: String,
    phoneNumber: { type: String, unique: true, sparse: true },
    isPhoneVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["User", "Customer", "Vendor"],
      default: "User",
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  const token = await signToken({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

const User = mongoose.model("User", userSchema);

export { User };
