import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Job from "@/models/Job";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    if (!id?.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid job ID format" },
        { status: 400 }
      );
    }

    const job = await Job.findById(id).lean();
    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      ...job,
      skillsRequired: job.skillsRequired || []
    });
  } catch (error) {
    console.error("Error fetching job:");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
