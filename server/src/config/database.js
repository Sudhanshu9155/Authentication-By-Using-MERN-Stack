import mongoose from "mongoose";
import config from "./config.js";
import dns from "dns";

// Use Google DNS to bypass corporate/Cisco DNS that blocks MongoDB SRV records
dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  await mongoose.connect(config.MONGO_URI);
  console.log("MongoDB connected");
}

export default connectDB;