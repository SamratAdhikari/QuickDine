import mongoose from "mongoose";

// Define the Bill schema
const billSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    tableNo: {
      type: Number,
      required: true,
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item", // Reference to the Item model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Middleware to calculate total price before saving
billSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  this.updatedAt = Date.now();
  next();
});

// Avoid overwriting the model if it's already defined
let Bill;

if (mongoose.models.Bill) {
  Bill = mongoose.model("Bill");
} else {
  Bill = mongoose.model("Bill", billSchema);
}

export default Bill;
