import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  themeColor: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Restaurant", restaurantSchema);
