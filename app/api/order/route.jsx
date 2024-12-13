import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../utils/dbConnect"; // Correct the path based on your project structure
import Order from "../models/Order"; // Ensure the path to your Mongoose model is correct
import Item from "../models/Item";

// Fetch all orders
export async function GET(request) {
  try {
    await dbConnect(); // Ensure database connection
    const allOrders = await Order.find() // Fetch all orders
      .populate("items.item", "name price"); // Populate item details like name and price

    return NextResponse.json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// Create a new order
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate the input manually
    if (!body.tableNo || !body.items || !Array.isArray(body.items)) {
      return NextResponse.json(
        { error: "Table number and items are required!" },
        { status: 400 }
      );
    }

    // Ensure database connection
    await dbConnect();

    // Check if all item IDs are valid
    const itemIds = body.items.map((item) => item.item._id);
    const items_db = await Item.find({ _id: { $in: itemIds } });
    // console.log("hello: ", itemIds);
    // console.log("hello: ", items);
    // If some items are not found, return an error
    if (items_db.length !== body.items.length) {
      return NextResponse.json(
        { error: "One or more items not found." },
        { status: 404 }
      );
    }
    body.items.map((item) => {
      console.log(item);
    });

    // console.log(body.items[0].quantity);
    // Create a new order
    const newOrder = new Order({
      tableNo: body.tableNo,
      items: body.items,
      orderStatus: body.orderStatus || "pending", // Default to 'pending' if no status is provided
    });

    console.log(newOrder);

    // Save the new order to the database
    const savedOrder = await newOrder.save();

    // Populate the item details (name and price) and exclude _id from the items
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate("items.item", "name price") // Populate item name and price
      .lean(); // Use lean() to get plain JS objects and manipulate them

    // Remove the _id from the items
    populatedOrder.items = populatedOrder.items.map((item) => {
      // Destructure to remove the _id field from each item object
      const { _id, ...rest } = item;
      return rest;
    });

    return NextResponse.json(populatedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
