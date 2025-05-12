"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

function CourseShowcase() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        const result = await response.json();

        if (Array.isArray(result.data)) {
          // Only keep the first 3 courses
          setCourses(result.data.slice(0, 3));
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Course Fetching Error:");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center max-w-3xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-900'>Popular Courses</h2>
            <p className='mt-4 text-lg text-slate-600'>Hand-picked by our experts to jumpstart your career</p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
            {loading ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 col-span-full'>
                {[...Array(3)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className=' shadow-lg border border-gray-300 bg-gray-100 p-6 h-80'
                  >
                    <div className='h-6 w-3/4 bg-gray-300 rounded mb-4'></div>
                    <div className='h-4 w-1/2 bg-gray-300 rounded mb-4'></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-4 w-16 bg-gray-300 rounded"></div>
                      <div className="h-4 w-16 bg-gray-300 rounded"></div>
                    </div>
                    <div className='h-4 w-5/6 bg-gray-300 rounded mb-4'></div>
                    <div className='h-4 w-4/6 bg-gray-300 rounded mb-4'></div>
                    <div className='h-10 w-full bg-gray-300 rounded mt-6'></div>
                  </Skeleton>
                ))}
              </div>
            ) : courses.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No courses available at the moment</p>
              </div>
            ) : (
              courses.map((course, index) => (
                <motion.div
                  key={course._id || index}
                  whileHover={{ y: -5 }}
                  className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-100'
                >
                  <div className='h-48 bg-gradient-to-r from-indigo-500 to-indigo-300 relative'>
                    <div className='absolute top-4 left-4 px-3 py-1 bg-white rounded-full text-xs font-medium text-indigo-600'>
                      {course.category || "General"}
                    </div>
                  </div>
                  <div className='p-6'>
                    <h3 className='text-xl font-semibold text-slate-800'>{course.title}</h3>
                    <p className='mt-2 text-slate-600 line-clamp-2'>{course.description}</p>
                    <div className='mt-4 flex justify-between items-center'>
                      <span className='text-sm text-slate-500'>{course.duration || "Flexible"}</span>
                      <Link href={`/courses/${course.slug || course._id}`}>
                        <button className='text-indigo-600 font-medium hover:text-indigo-800 transition-colors'>
                          View Details →
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {!loading && courses.length > 0 && (
            <div className='mt-12 text-center'>
              <Link href='/courses'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-all'
                >
                  Browse All Courses
                </motion.button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CourseShowcase;