"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AddCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    fee: "",
    subjects: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.fee) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newCourse = {
      ...formData,
      fee: parseFloat(formData.fee), // Convert fee to number
      subjects: formData.subjects
        ? formData.subjects.split(",").map((s) => s.trim()) // Convert subjects to an array
        : [],
    };

    try {
      setLoading(true); // Start loading state

      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Course added successfully!");
        setFormData({ title: "", description: "", duration: "", fee: "", subjects: "" });

        setTimeout(() => router.push("/admin/courses"), 1000);
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("❌ Error adding course:");
      toast.error("Failed to add course.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Add New Course</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="title"
              placeholder="Course Title"
              value={formData.title}
              onChange={handleChange}
              required
              aria-label="Course Title"
            />
            <Textarea
              name="description"
              placeholder="Course Description"
              value={formData.description}
              onChange={handleChange}
              required
              aria-label="Course Description"
            />
            <Input
              type="text"
              name="duration"
              placeholder="Duration (e.g., 3 months)"
              value={formData.duration}
              onChange={handleChange}
              aria-label="Course Duration"
            />
            <Input
              type="number"
              name="fee"
              placeholder="Course Fee ($)"
              value={formData.fee}
              onChange={handleChange}
              required
              aria-label="Course Fee"
              min="0"
            />
            <Input
              type="text"
              name="subjects"
              placeholder="Subjects (comma-separated)"
              value={formData.subjects}
              onChange={handleChange}
              aria-label="Course Subjects"
            />

            <div className="flex gap-2 justify-between">
              <Button
                type="button"
                className="bg-gray-500 hover:bg-gray-600"
                onClick={() => router.push("/admin/courses")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Course"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
