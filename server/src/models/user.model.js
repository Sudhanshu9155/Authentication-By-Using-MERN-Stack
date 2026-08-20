import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username already exists"],
  },
  email:{
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  verified:{
    type: Boolean,
    default: false
  }
})


const userModel = mongoose.model("User", userScheme); 

export default userModel;