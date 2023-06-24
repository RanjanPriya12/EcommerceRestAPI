const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Product Name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter Product Description"],
    },
    color: { type: [String], required: [true, "Please Enter Product Color"] },
    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },
    subCategory: {
      type: String,
      required: [true, "Please Enter Product Sub-Category"],
    },
    size: { type: [Number], required: false },
    brand: { type: String, required: [true, "Please Enter Product Brand"] },
    price: {
      type: Number,
      required: [true, "Please Enter Product Price"],
      maxLength: [8, "Price cannot exceed 8 digits"],
    },
    ratings: { type: Number, default: 0 },
    discount: { type: Number, required: true, default: 5 },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    stock: {
      type: Number,
      required: [true, "Please Enter Product stock"],
      maxLength: [4, "Stock cannot exceed 4"],
      default: 1,
    },
    numOfReviews: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
    user: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("Product", productSchema);