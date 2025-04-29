// app/api/jobs/active/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";

export async function GET() {
  try {
    await dbConnect();
    const now = new Date();
    const jobs = await Job.find({
      isActive: true,
      status: "active",
      deadline: { $gte: now }
    }).sort({ createdAt: -1 }).lean();
    
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching active jobs:");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}