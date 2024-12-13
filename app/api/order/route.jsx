import { NextResponse } from "next/server";
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
        if (!body.table || !body.items || !Array.isArray(body.items)) {
            return NextResponse.json(
                { error: "Table number and items are required!" },
                { status: 400 }
            );
        }

        // Ensure database connection
        await dbConnect();

        // Log the incoming item IDs to verify they are correct
        const itemIds = body.items.map((item) => item.item);
        console.log("Received item IDs:", itemIds); // Log to check if IDs are correct

        // Query the database for these items
        const items_db = await Item.find({ _id: { $in: itemIds } });

        // If some items are not found, return an error
        if (items_db.length !== body.items.length) {
            return NextResponse.json(
                { error: "One or more items not found." },
                { status: 404 }
            );
        }

        // Continue with the order creation
        const newOrder = new Order({
            table: body.table,
            items: body.items,
            orderStatus: body.orderStatus || "pending", // Default to 'pending' if no status is provided
        });

        const savedOrder = await newOrder.save();

        // Populate the item details (name and price)
        const populatedOrder = await Order.findById(savedOrder._id)
            .populate("items.item", "name price") // Populate item name and price
            .lean();

        populatedOrder.items = populatedOrder.items.map((item) => {
            const { _id, ...rest } = item;
            return rest;
        });

        return NextResponse.json(populatedOrder); // Send the populated order response
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}
