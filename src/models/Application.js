
import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\d{10,15}$/, "Phone number must be 10 to 15 digits"],
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true, // ✅ speeds up queries when filtering by job
    },
    resumePublicId: {
      type: String,
      required: true, // ✅ very important for generating Cloudinary signed URLs
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, // ✅ createdAt and updatedAt fields automatically
  }
);

// Prevent duplicate applications for same job by same email
ApplicationSchema.index({ email: 1, jobId: 1 }, { unique: true });

// ✅ Export model safely to prevent overwrite in dev
export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
