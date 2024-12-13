import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/dbConnect"; // Ensure this path is correct
import Bill from "../../models/Bill"; // Ensure this path is correct

// GET: Fetch a single bill by ID
export async function GET(request, { params }) {
  try {
    await dbConnect();

    // Find the bill by ID and populate related item and order details
    const bill = await Bill.findById(params.id)
      .populate("items.item", "name price") // Populate item details
      .populate("order", "tableNo orderStatus"); // Populate order details

    if (!bill) {
      return NextResponse.json({ error: "Bill not found!" }, { status: 404 });
    }

    // Calculate the total price if it isn't already included
    if (!bill.totalPrice) {
      bill.totalPrice = bill.items.reduce((total, item) => {
        return total + item.item.price * item.quantity;
      }, 0);
    }

    return NextResponse.json(bill);
  } catch (error) {
    console.error("Error fetching bill:", error);
    return NextResponse.json(
      { error: "Failed to fetch bill" },
      { status: 500 }
    );
  }
}

// PATCH: Update an existing bill by ID (Partial Update)
export async function PATCH(request, { params }) {
  try {
    const body = await request.json();

    await dbConnect(); // Ensure database connection

    // Find the bill by ID
    const bill = await Bill.findById(params.id);

    if (!bill) {
      return NextResponse.json(
        { error: "Bill doesn't exist to update!" },
        { status: 404 }
      );
    }

    // Prepare the update data object (only include fields that are present in the request)
    const updateData = {};

    // Only update the fields that are provided in the request body
    if (body.tableNo) updateData.tableNo = body.tableNo;
    if (body.items) updateData.items = body.items;

    // Perform the update with only the fields present in the body
    const updatedBill = await Bill.findByIdAndUpdate(
      params.id,
      updateData, // Only update the provided fields
      { new: true } // Return the updated document
    );

    return NextResponse.json(updatedBill);
  } catch (error) {
    console.error("Error updating bill:", error);
    return NextResponse.json(
      { error: "Failed to update bill" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a bill by ID
export async function DELETE(request, { params }) {
  try {
    await dbConnect(); // Ensure database connection

    // Find the bill by ID
    const bill = await Bill.findById(params.id);

    if (!bill) {
      return NextResponse.json(
        { error: "No bill exists to delete!" },
        { status: 400 }
      );
    }

    // Delete the bill
    await Bill.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Bill deleted successfully" });
  } catch (error) {
    console.error("Error deleting bill:", error);
    return NextResponse.json(
      { error: "Failed to delete bill" },
      { status: 500 }
    );
  }
}
