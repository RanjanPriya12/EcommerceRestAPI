const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cartId: { type: mongoose.Schema.ObjectId, ref: "cart", required: true },
    userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
    username: { type: String, required: true },
    email: { type: String, required: false },
    mobile: { type: Number, required: true },
    alternate_mobile: { type: Number, required: true },
    Lacal_address: { type: String, required: true },
    pincode: { type: Number, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Order = new mongoose.model("order", orderSchema);
module.exports = Order;
