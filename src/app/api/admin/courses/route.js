import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import mongoose from "mongoose";

/**
 * @desc Fetch all courses
 * @route GET /api/courses
 * @access Public
 */
export async function GET() {
  await dbConnect();

  try {
    const courses = await Course.find();
    return NextResponse.json({ success: true, data: courses }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching courses:");
    return NextResponse.json(
      { error: error.message },
      { success: false, message: "Unable to retrieve courses. Please try again later." },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

/**
 * @desc Create a new course
 * @route POST /api/courses
 * @access Private/Admin
 */
export async function POST(req) {
  await dbConnect();

  try {
    // Ensure request body is valid JSON
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
    }

    const { title, description, duration, fee, subjects } = body;

    // Validate required fields
    if (!title || !description || !duration || !fee || !Array.isArray(subjects) || subjects.length === 0) {
      return NextResponse.json(
        { success: false, message: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // Create new course
    const newCourse = new Course({ title, description, duration, fee, subjects });
    await newCourse.save();

    return NextResponse.json({ success: true, data: newCourse, message: "Course created successfully" }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating course:");
    return NextResponse.json(
      { success: false, message: "Failed to create course. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * @desc Delete a course by ID
 * @route DELETE /api/courses
 * @access Private/Admin
 */
export async function DELETE(req) {
  await dbConnect();

  try {
    // Ensure request body is valid JSON
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
    }

    const { id } = body;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid Course ID" }, { status: 400 });
    }

    // Attempt to delete the course
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Course deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting course:");
    return NextResponse.json(
      { success: false, message: "Failed to delete course. Please try again." },
      { status: 500 }
    );
  }
}
