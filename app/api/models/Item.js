import mongoose from "mongoose";

// Define your schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.Mixed, // Allows both int and float values
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },

  url: {
    type: String,
    required: false,
    // default: "",
  },
});

// Avoid overwriting the model if it's already defined
let Item;

if (mongoose.models.Item) {
  Item = mongoose.model("Item");
} else {
  Item = mongoose.model("Item", itemSchema);
}

export default Item;
