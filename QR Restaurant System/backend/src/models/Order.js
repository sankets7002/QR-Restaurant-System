import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    },

    tableNumber: {
      type: Number,
      required: true
    },

    items: [
      {
        name: String,
        price: Number,
        qty: Number
      }
    ],

    status: {
      type: String,
      enum: ["placed", "accepted", "preparing", "ready", "served"],
      default: "placed"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
