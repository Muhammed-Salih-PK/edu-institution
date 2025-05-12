import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Course from "@/models/Course";

/**
 * @desc Fetch all courses
 * @route GET /api/courses
 * @access Public
 */
export async function GET() {
  await connectToDatabase();

  try {
    const courses = await Course.find();
    return NextResponse.json({ success: true, data: courses }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching courses:");
    return NextResponse.json(
      { error: error.message },
      {
        success: false,
        message: "Unable to retrieve courses. Please try again later.",
      },
      { status: error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
