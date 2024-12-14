import mongoose from "mongoose";

// Define the schema for an order
const userSchema = new mongoose.Schema({
    primary_id: {
        required: true,
        type: String,
    },

    roles: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
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

export default User;
