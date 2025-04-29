import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";

export async function GET(req, { params }) {
  try {
    await dbConnect();
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

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    if (!id?.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid job ID format" },
        { status: 400 }
      );
    }

    const data = await req.json();
    
    // Process skills
    const skills = Array.isArray(data.skillsRequired)
      ? data.skillsRequired
      : typeof data.skillsRequired === 'string'
        ? data.skillsRequired.split(',').map(s => s.trim()).filter(s => s)
        : [];

    // Automatically set isActive if deadline is in the past
    if (data.deadline && new Date(data.deadline) < new Date()) {
      data.isActive = false;
      data.status = "expired";
    }
    
    const updatedJob = await Job.findByIdAndUpdate(id, {
      ...data,
      skillsRequired: skills
    }, {
      new: true,
      runValidators: true
    });

    if (!updatedJob) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}