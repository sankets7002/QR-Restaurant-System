import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  name: String,
  role: {
    type: String,
    enum: ["admin", "chef", "cashier"],
    required: true
  },
  passwordHash: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
