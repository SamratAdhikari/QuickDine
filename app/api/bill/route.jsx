import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../utils/dbConnect"; // Correct the path based on your project structure
import Bill from "../models/Bill"; // Ensure the path to your Mongoose model is correct
import Order from "../models/Order";
import Item from "../models/Item";
// GET: Fetch all bills
export async function GET(request) {
  try {
    await dbConnect();

    // Fetch all bills and populate item and order details
    const bills = await Bill.find()
      .populate("items.item", "name price")
      .populate("order", "tableNo orderStatus");

    return NextResponse.json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    return NextResponse.json(
      { error: "Failed to fetch bills" },
      { status: 500 }
    );
  }
}

// POST: Create a new bill
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.order || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Order ID and items are required!" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Validate the order exists
    const order = await Order.findById(body.order);
    if (!order) {
      return NextResponse.json(
        { error: "Referenced order does not exist!" },
        { status: 404 }
      );
    }

    // Validate all items exist
    const itemIds = body.items.map((item) => item.item);
    // console.log("hello: ", itemIds);
    const validItems = await Item.find({ _id: { $in: itemIds } });
    if (validItems.length !== itemIds.length) {
      return NextResponse.json(
        { error: "One or more referenced items do not exist!" },
        { status: 404 }
      );
    }

    // Calculate the total price
    const totalPrice = body.items.reduce((sum, item) => {
      const itemData = validItems.find((i) => i._id.equals(item.item));
      return sum + itemData.price * item.quantity;
    }, 0);

    // Create the new bill
    const newBill = new Bill({
      order: body.order,
      tableNo: body.tableNo,
      items: body.items,
      totalPrice,
    });

    const savedBill = await newBill.save();
    console.log(savedBill.items);
    // Populate and return the created bill
    const populatedBill = await Bill.findById(savedBill._id)
      .populate("items.item", "name price")
      .populate("order", "tableNo orderStatus");

    return NextResponse.json(populatedBill, { status: 201 });
  } catch (error) {
    console.error("Error creating bill:", error);
    return NextResponse.json(
      { error: "Failed to create bill" },
      { status: 500 }
    );
  }
}
