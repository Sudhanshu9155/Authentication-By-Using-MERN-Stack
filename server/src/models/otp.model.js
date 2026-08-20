import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    otpHash: {
      type: String,
      required: [true, "OTP hash is required"],
    },
    // TTL field — MongoDB auto-deletes the document 10 minutes after createdAt
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600, // 10 minutes in seconds
    },
  },
  {
    timestamps: true, // fixed: was "timestamp" (singular) — typo
  }
);

const otpModel = mongoose.model("otps", otpSchema);

export default otpModel;