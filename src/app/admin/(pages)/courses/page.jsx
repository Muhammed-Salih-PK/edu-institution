"use client";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaBookOpen } from "react-icons/fa";
import { CourseCards } from "@/components/course-cards";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/admin/courses");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to load courses");

        setCourses(data.data || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // ✅ Run only once

  // Delete course function
  const handleDelete = async (id) => {
    

    try {
      const res = await fetch("/api/admin/courses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to delete course");

      setCourses((prev) => prev.filter((course) => course._id !== id));
      toast.success("Course deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center p-6 text-black dark:text-white'>
      <div className='w-full max-w-7xl'>
        {/* Add Course Button */}
        <div className='mb-6 flex justify-center sm:justify-end'>
          <Link href='/admin/courses/add'>
            <Button className='flex items-center gap-2 px-5 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105'>
              <FaPlus /> Add Course
            </Button>
          </Link>
        </div>

        {/* Loading State with Skeleton */}
        {loading ? (
          <div className='grid grid-cols-1 gap-6 px-4 lg:px-6 xl:grid-cols-2 5xl:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className='h-52 w-full rounded-lg' />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className='flex flex-col items-center text-gray-400 mt-8'>
            <FaBookOpen className='text-5xl mb-3 text-gray-600 dark:text-gray-500' />
            <p className='text-lg'>No courses available</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-6 px-4 lg:px-6 xl:grid-cols-2 5xl:grid-cols-4'>
            {courses.map((course) => (
              <CourseCards
                key={course._id}
                CourseId={course._id}
                Coursetitle={course.title}
                CourseDuration={course.duration}
                CourseDescription={course.description}
                CourseFees={course.fee}
                CourseSubjects={course.subjects}
                onDelete={() => handleDelete(course._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
