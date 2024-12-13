import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request, {params}) {
  try{
    console.log(request);
    await dbConnect();

    const user = await User.findById(params.id );
    if (user) {
      return NextResponse.json({ message: user }, { status: 200 });
    }
  }catch(error){
    return NextResponse.json({error: "Failed to fetch user"}, {status: 400})
  }
}

