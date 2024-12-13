import mongoose from "mongoose";

// Define the schema for an order
const userSchema = new mongoose.Schema({
  username: String,

  roles: {
    type: [String],
    default: ["user"],
  },

  password: String,
});

// Export the model
const User = mongoose.model("User", userSchema);

module.exports = User;
