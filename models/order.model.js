const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cartId: { type: mongoose.Schema.ObjectId, ref: "cart", required: true },
    userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  },{
    versionKey: false,
    timestamps: true,
  });

const Order = new mongoose.model("order", orderSchema);
module.exports = Order;
