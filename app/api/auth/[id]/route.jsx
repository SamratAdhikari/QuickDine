import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import { NextResponse } from "next/server";

<<<<<<< HEAD
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const user = await User.findById(id);
    if (user) {
      console.log(user);
      // Redirect to '/page'
      return NextResponse.redirect(
        new URL(
          `/menu?user=${encodeURIComponent(JSON.stringify(user))}`,
          request.url
        )
      );
    }

    // Return a 404 response if the user is not found
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 400 }
    );
  }
=======
export async function GET(request) {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    try {
        // Connect to the database
        await dbConnect();
        console.log("Received ID:", id);

        // Find the user by ID
        const user = await User.findById(id);
        if (user) {
            // Redirect to the '/menu' page with only the user ID as a query param
            return NextResponse.redirect(
                new URL(`/menu/?id=${id}`, request.url)
            );
        }

        // Return a 404 response if the user is not found
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    } catch (error) {
        // Return a 500 status code if there is a server error
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Failed to fetch user" },
            { status: 500 }
        );
    }
>>>>>>> 86beb7b07154017184556a99da1c5226c9608c2c
}
