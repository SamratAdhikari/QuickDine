import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/dbConnect"; // Ensure this path is correct
import Item from "../../models/Item"; // Ensure this path is correct

export async function GET(request, { params }) {
  try {
    await dbConnect(); // Ensure database connection

    // Find the product by ID
    const prod = await Item.findById(params.id);

    if (!prod) {
      return NextResponse.json({ error: "No product found!" }, { status: 404 });
    }

    return NextResponse.json(prod);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PATCH: Update an existing product by ID (Partial Update)
export async function PATCH(request, { params }) {
  try {
    const body = await request.json();

    await dbConnect(); // Ensure database connection

    // Find the product by ID
    const prod = await Item.findById(params.id);

    if (!prod) {
      return NextResponse.json(
        { error: "Product doesn't exist to update!" },
        { status: 404 }
      );
    }

    // Prepare the update data object (only include fields that are present in the request)
    const updateData = {};

    // Only update the fields that are provided in the request body
    if (body.name) updateData.name = body.name;
    if (body.price) updateData.price = body.price;
    if (body.description) updateData.description = body.description;
    if (body.category) updateData.category = body.category;
    if (body.url) updateData.url = body.url;

    // Perform the update with only the fields present in the body
    const updatedProd = await Item.findByIdAndUpdate(
      params.id,
      updateData, // Only update the provided fields
      { new: true } // Return the updated document
    );

    return NextResponse.json(updatedProd);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect(); // Ensure database connection

    // Find the product by ID
    const prod = await Item.findById(params.id);

    if (!prod) {
      return NextResponse.json(
        { error: "No product exists to delete!" },
        { status: 400 }
      );
    }

    // Delete the product
    await Item.findByIdAndDelete(params.id);

    return NextResponse.json({});
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
