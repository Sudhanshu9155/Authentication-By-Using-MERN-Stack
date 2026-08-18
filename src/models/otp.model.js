import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email:{
    type: String,
    required: [true, "Please provide an email"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "user is required"],
  },
  otpHash:{
    type: String,
    required: [true, "Otp hash is required"],
  }
},{
  timestamp: true
})

const otpModel = mongoose.model("otps", otpSchema);

export default otpModel;