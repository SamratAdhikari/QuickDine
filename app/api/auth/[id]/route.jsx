import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import { NextResponse } from "next/server";

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
}
