// app/api/admin/jobs/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
import Application from "@/models/Application";

export async function GET() {
  try {
    await dbConnect();
    const jobs = await Job.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Validate required fields
    const requiredFields = ["title", "description", "department", "employmentType", "locationType", "salary", "deadline"];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Create job with default active status
    const job = await Job.create({
      ...data,
      isActive: true,
      status: "active"
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { id } = await request.json();

    if (!id?.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid job ID format" },
        { status: 400 }
      );
    }

    // Delete job and associated applications
    await Promise.all([
      Application.deleteMany({ jobId: id }),
      Job.findByIdAndDelete(id)
    ]);

    return NextResponse.json(
      { message: "Job and applications deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting job:");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}