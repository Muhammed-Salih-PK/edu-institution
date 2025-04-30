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

/**
 * @desc Update a course by ID
 * @route PUT /api/admin/courses/[id]
 */
export async function PUT(req, { params }) {
  await connectToDatabase();
  const { id } = params;

  // Validate Course ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid course ID format" }, { status: 400 });
  }

  try {
    // Parse JSON request body
    const { title, description, duration, fee, subjects } = await req.json();

    // Validate required fields
    if (!title || !description || !duration || !fee || !Array.isArray(subjects)) {
      return NextResponse.json({ error: "Missing or invalid required fields" }, { status: 400 });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, description, duration, fee, subjects },
      { new: true, runValidators: true } // Ensure validation rules are enforced
    ).lean();

    if (!updatedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating course:");
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}
