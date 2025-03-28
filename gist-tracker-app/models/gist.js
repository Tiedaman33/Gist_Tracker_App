import mongoose from "mongoose";

const GistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    code: String,
}, { timestamps: true });

export default mongoose.models.Gist || mongoose.model("Gist", GistSchema);