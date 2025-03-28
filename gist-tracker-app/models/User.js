import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { 
    type: String,
    unique: true,  
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    required: true,
  },
  password: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);