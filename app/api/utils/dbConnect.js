import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://Ubermensch:MongoDB0330@cluster0.pvq6igq.mongodb.net/Octane?retryWrites=true&w=majority&appName=Cluster0";

async function dbConnect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB connected.");
  } catch (err) {
    console.log(err);
  }
}

module.exports = dbConnect;
