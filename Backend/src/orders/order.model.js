const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      city: String,
      country: String,
      state: String,
      zipcode: String,
    },
    phone: { type: String, required: true },
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    totalPrice: { type: Number, required: true },
    userId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
