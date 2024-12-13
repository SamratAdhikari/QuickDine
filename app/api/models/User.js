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

// Avoid overwriting the model if it's already defined
let User;

if (mongoose.models.User) {
  User = mongoose.model("User");
} else {
  User = mongoose.model("User", userSchema);
}

module.exports = User;
