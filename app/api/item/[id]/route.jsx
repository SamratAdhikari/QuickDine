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

export async function PUT(request, { params }) {
  try {
    const body = await request.json();

    // Validate the input manually (you can use a schema validation library like Joi or Zod)
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Name and price are required!" },
        { status: 400 }
      );
    }

    await dbConnect(); // Ensure database connection

    // Find the product by ID
    const prod = await Item.findById(params.id);

    if (!prod) {
      return NextResponse.json(
        { error: "Product doesn't exist to update!" },
        { status: 404 }
      );
    }

    // Update the product
    const updatedProd = await Item.findByIdAndUpdate(
      params.id,
      {
        name: body.name,
        price: body.price,
        description: body.description,
        category: body.category,
      },
      { new: true }
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
