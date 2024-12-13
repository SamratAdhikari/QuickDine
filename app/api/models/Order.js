// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    table: { type: String, required: true },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    orderStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    // bill: { type: mongoose.Schema.Types.ObjectId, ref: "Bill" }, // Link to Bill
  },
  { timestamps: true }
);

// Avoid overwriting the model if it's already defined
let Order;

if (mongoose.models.Order) {
  Order = mongoose.model("Order");
} else {
  Order = mongoose.model("Order", orderSchema);
}

export default Order;
