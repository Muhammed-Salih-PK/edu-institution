// models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { 
    type: String, 
    required: true,
    enum: ["engineering", "design", "marketing", "operations", "hr", "product"]
  },
  employmentType: { 
    type: String, 
    required: true,
    enum: ["full-time", "part-time", "contract", "internship", "freelance"]
  },
  locationType: {
    type: String,
    required: true,
    enum: ["remote", "onsite", "hybrid"]
  },
  location: { type: String },
  salary: { type: String, required: true },
  skillsRequired: { type: [String], default: [] },
  deadline: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  status: {
    type: String,
    enum: ["active", "expired", "archived"],
    default: "active"
  }
}, { timestamps: true });

// Add pre-save hook to automatically update status
jobSchema.pre("save", function(next) {
  if (this.deadline && new Date(this.deadline) < new Date()) {
    this.isActive = false;
    this.status = "expired";
  }
  next();
});

export default mongoose.models.Job || mongoose.model("Job", jobSchema);