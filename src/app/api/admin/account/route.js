import { verifyJwtToken } from "@/lib/auth";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";

export async function GET(req) {
  await connectToDatabase();
  const token = req.cookies.get("adminToken")?.value;
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const payload = await verifyJwtToken(token);

    const id = payload.id;
    console.log(id);

    // Validate Course ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid Admin ID format" },
        { status: 400 }
      );
    }

    const admin = await Admin.findById(id).lean(); // Use lean() for performance optimization
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
    return NextResponse.json(admin, { status: 200 });
  } catch (error) {
    return new Response("Invalid token", { status: 401 });
  }
}
