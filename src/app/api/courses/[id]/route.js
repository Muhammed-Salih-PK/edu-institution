import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import Course from "@/models/Course";

/**
 * @desc Fetch a single course by ID
 * @route GET /api/admin/courses/[id]
 */
export async function GET(req, context) {
  await connectToDatabase();
  const { id } = await context.params;

  // Validate Course ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid course ID format" }, { status: 400 });
  }

  try {
    const course = await Course.findById(id).lean(); // Use lean() for performance optimization
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching course:");
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}
