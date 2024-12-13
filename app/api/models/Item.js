import mongoose from "mongoose";

// Define the schema for an order
const itemSchema = new mongoose.Schema({
    orderedTime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    tableNumber: {
        type: Number,
        required: true,
    },
    items: [
        {
            name: {
                type: String,
                required: true,
            },
        },
    ],
    status: {
        type: String,
        enum: ["order placed", "cooking", "completed"],
        required: true,
        default: "order placed",
    },
});

// Export the model
const Item = mongoose.model("Item", itemSchema);

export default Item;
