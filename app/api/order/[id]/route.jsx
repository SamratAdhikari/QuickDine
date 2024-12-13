import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/dbConnect"; // Ensure this path is correct
import Order from "../../models/Order"; // Ensure this path is correct

// GET: Fetch a specific order by ID
export async function GET(request, { params }) {
  try {
    await dbConnect(); // Ensure database connection

    // Find the order by ID and populate item details
    const order = await Order.findById(params.id).populate(
      "items.item",
      "name price"
    ); // Populate item details like name and price

    if (!order) {
      return NextResponse.json({ error: "No order found!" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

// PATCH: Update an existing order by ID (Partial Update)
export async function PATCH(request, { params }) {
  try {
    const body = await request.json();

    // Ensure database connection
    await dbConnect();

    // Find the order by ID
    const order = await Order.findById(params.id);

    if (!order) {
      return NextResponse.json(
        { error: "Order doesn't exist to update!" },
        { status: 404 }
      );
    }

    // Prepare the update data object (only include fields that are present in the request)
    const updateData = {};

    // Only update the fields that are provided in the request body
    if (body.tableNo) updateData.tableNo = body.tableNo;
    if (body.items) {
      // If items are provided, map the items to the existing item reference and quantity
      updateData.items = body.items.map((item) => ({
        item: item.item, // Item reference ID
        quantity: item.quantity, // Quantity of the item
      }));
    }
    if (body.orderStatus) updateData.orderStatus = body.orderStatus;

    // Perform the update with only the fields present in the body
    const updatedOrder = await Order.findByIdAndUpdate(
      params.id,
      updateData, // Only update the provided fields
      { new: true } // Return the updated document
    ).populate("items.item", "name price"); // Populate updated order with item details

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

// DELETE: Delete an order by ID
export async function DELETE(request, { params }) {
  try {
    await dbConnect(); // Ensure database connection

    // Find the order by ID
    const order = await Order.findById(params.id);

    if (!order) {
      return NextResponse.json(
        { error: "No order exists to delete!" },
        { status: 400 }
      );
    }

    // Delete the order
    await Order.findByIdAndDelete(params.id);

    return NextResponse.json({});
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
