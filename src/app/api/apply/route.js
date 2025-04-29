import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Application from "@/models/Application";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim().toLowerCase();
    const phone = formData.get("phone")?.trim();
    const jobId = formData.get("jobId")?.trim();
    const resume = formData.get("resume");

    // Check for missing fields
    if (!name || !email || !phone || !jobId || !resume) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate resume file type (only PDF allowed)
    if (!resume.type.startsWith("application/pdf")) {
      return NextResponse.json(
        { message: "Resume must be a PDF file" },
        { status: 400 }
      );
    }

    // Validate resume file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (resume.size > maxSize) {
      return NextResponse.json(
        { message: "Resume size too large (max 5MB)" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check for duplicate application (same email + jobId)
    const existing = await Application.findOne({ email, jobId });
    if (existing) {
      return NextResponse.json(
        { message: "You have already applied for this job" },
        { status: 409 }
      );
    }

    // Convert resume file to buffer
    const arrayBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary (private)
    const cloudinaryUpload = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw",
            folder: "resumes",
            public_id: `resume_${Date.now()}_${resume.name}`,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    if (!cloudinaryUpload?.public_id) {
      return NextResponse.json(
        { message: "Resume upload failed" },
        { status: 500 }
      );
    }

    // Save application to MongoDB
    const application = await Application.create({
      name,
      email,
      phone,
      jobId,
      resumePublicId: cloudinaryUpload.public_id,
    });

    // Respond with minimal info
    return NextResponse.json(
      {
        success: true,
        data: {
          id: application._id,
          name: application.name,
          email: application.email,
          jobId: application.jobId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application error:");
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
