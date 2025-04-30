import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Application from "@/models/Application";
import Job from "@/models/Job";

/**
 * @desc Fetch all applications with job details (sorted by job title)
 * @route GET /api/admin/applications
 * @access Private
 */
export async function GET() {
  await connectToDatabase()

  try {
    const applications = await Application.find()
      .populate("jobId", "title company location") // Populate specific fields
      .sort({ "jobId.title": 1 }); // Sort applications by job title (ascending)

    return NextResponse.json(
      {
        success: true,
        count: applications.length,
        data: applications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching applications:");
    return NextResponse.json(
      { success: false, message: "Error fetching applications", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @desc Delete an application by ID
 * @route DELETE /api/admin/applications
 * @access Private
 */
export async function DELETE(req) {
  await connectToDatabase()

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Application ID is required" },
        { status: 400 }
      );
    }

    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Application deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting application:");
    return NextResponse.json(
      { success: false, message: "Error deleting application", error: error.message },
      { status: 500 }
    );
  }
}


// /**
//  * @desc Create a new applications
//  * @route POST /api/applications
//  * @access public
//  */
// export async function POST(req) {
//   await connectToDatabase();

//   try {
//     // Ensure request body is valid JSON
//     const body = await req.json();
//     if (!body || typeof body !== "object") {
//       return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
//     }

//     const { title, description, duration, fee, subjects } = body;

//     // Validate required fields
//     if (!title || !description || !duration || !fee || !Array.isArray(subjects) || subjects.length === 0) {
//       return NextResponse.json(
//         { success: false, message: "Missing or invalid required fields" },
//         { status: 400 }
//       );
//     }

//     // Create new course
//     const newCourse = new Course({ title, description, duration, fee, subjects });
//     await newCourse.save();

//     return NextResponse.json({ success: true, data: newCourse, message: "Course created successfully" }, { status: 201 });
//   } catch (error) {
//     console.error("❌ Error creating course:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to create course. Please try again." },
//       { status: 500 }
//     );
//   }
// }
