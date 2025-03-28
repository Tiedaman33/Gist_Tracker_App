import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" }); // Explicit path

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection Error:", error.message);
    process.exit(1);
  }
}

testConnection();