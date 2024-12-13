import mongoose from "mongoose";

// Define the schema for an order
const userSchema = new mongoose.Schema({
  primary_id:{
    require: true,
    type: String
  } ,

  roles: {
    type: [String],
    default: ["customer"],
  },

  password: String,
});

// Export the model
const User = mongoose.model("User", userSchema);

module.exports = User;
