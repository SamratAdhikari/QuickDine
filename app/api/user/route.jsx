import { NextResponse } from "next/server";
import dbConnect from "../utils/dbConnect"; // Correct the path based on your project structure
import User from "../models/User"; // Ensure the path to your Mongoose model is correct
var bcrypt = require("bcryptjs");

export async function GET(request) {
  try {
    await dbConnect(); // Ensure database connection
    const allUsers = await User.find(); // Fetch all users
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate the input manually
    if (!body.primary_id) {
      return NextResponse.json(
        { error: "Primary id is required" },
        { status: 400 }
      );
    }

    await dbConnect(); // Ensure database connection

    // Check if the item already exists
    const existingUser = await User.findOne({ primary_id: body.primary_id });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists!" },
        { status: 400 }
      );
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    // Create a new user
    const newUser = new User({
      primary_id: body.primary_id,
      roles: body.roles || ['customer'],
      password: hashedPassword
    });

    // const savedItem = await newItem.save(newItem);
    const savedUser = await User.create(newUser);
    return NextResponse.json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
