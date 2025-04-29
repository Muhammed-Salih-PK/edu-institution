"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton Component

const EditCourse = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    fee: "",
    subjects: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch Course Data
  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/admin/courses/${id}`);
        if (!res.ok) throw new Error("Failed to fetch course");

        const data = await res.json();
        setFormData({
          title: data?.title || "",
          description: data?.description || "",
          duration: data?.duration || "",
          fee: data?.fee?.toString() || "",
          subjects: data?.subjects?.join(", ") || "",
        });
      } catch (error) {
        toast.error("Error fetching course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.fee) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Validate fee format
    const feeValue = parseFloat(formData.fee);
    if (isNaN(feeValue) || feeValue < 0) {
      toast.error("Fee must be a valid non-negative number.");
      return;
    }

    const updatedCourse = {
      ...formData,
      fee: feeValue, // Convert fee to number
      subjects: formData.subjects
        ? formData.subjects.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    };

    try {
      setUpdating(true);
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCourse),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Course updated successfully!");
        setTimeout(() => router.push("/admin/courses"), 1500);
      } else {
        toast.error(data.error || "Failed to update course");
      }
    } catch (err) {
      toast.error("Error updating course");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Edit Course</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <div className="flex justify-between gap-4">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-10 w-1/3" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Course Title"
                aria-label="Course Title"
                required
                disabled={updating}
              />
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Course Description"
                aria-label="Course Description"
                required
                disabled={updating}
              />
              <Input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration (e.g., 6 months)"
                aria-label="Course Duration"
                disabled={updating}
              />
              <Input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                placeholder="Course Fee ($)"
                aria-label="Course Fee"
                required
                min="0"
                disabled={updating}
              />
              <Input
                type="text"
                name="subjects"
                value={formData.subjects}
                onChange={handleChange}
                placeholder="Subjects (comma-separated)"
                aria-label="Course Subjects"
                disabled={updating}
              />

              <div className="flex gap-2 justify-between">
                <Button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600"
                  onClick={() => router.push("/admin/courses")}
                  disabled={updating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600"
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Update Course"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCourse;
