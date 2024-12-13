import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../utils/dbConnect"; // Correct the path based on your project structure
import Item from "../models/Item"; // Ensure the path to your Mongoose model is correct

export async function GET(request) {
  try {
    await dbConnect(); // Ensure database connection
    const allItems = await Item.find(); // Fetch all items
    return NextResponse.json(allItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate the input manually
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Name and price are required!" },
        { status: 400 }
      );
    }

    await dbConnect(); // Ensure database connection

    // Check if the item already exists
    const existingItem = await Item.findOne({ name: body.name });
    if (existingItem) {
      return NextResponse.json(
        { error: "Item already exists!" },
        { status: 400 }
      );
    }

    // Create a new item
    const newItem = new Item({
      name: body.name,
      price: body.price,
      description: body.description || "",
      category: body.category || "",
    });

    // const savedItem = await newItem.save(newItem);
    const savedItem = await Item.create(newItem);
    return NextResponse.json(savedItem);
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}
