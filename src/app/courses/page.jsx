"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBookOpen, FaMosque, FaQuran, FaSearch } from "react-icons/fa";
import { GiArabicDoor } from "react-icons/gi";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/admin/courses");
        const result = await response.json();

        if (Array.isArray(result.data)) {
          setCourses(result.data);
          setFilteredCourses(result.data);
        } else {
          setCourses([]);
          setFilteredCourses([]);
        }
      } catch (error) {
        console.error("Course Fetching Error:");
        setCourses([]);
        setFilteredCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const results = courses.filter((course) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          (course.subjects && course.subjects.some((subject) => subject.toLowerCase().includes(searchLower)))
        );
      });
      setFilteredCourses(results);
    }, 300); // wait 300ms

    return () => clearTimeout(timeout); // cleanup
  }, [searchTerm, courses]);

  return (
    <div className='bg-slate-50 min-h-screen flex flex-col overflow-hidden mt-16'>
      <div className='flex flex-col items-center justify-center w-full transition-colors duration-300 py-12'>
        <div className='w-full max-w-7xl px-6'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-blue-600'>Our Arabic Programs</h1>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Comprehensive courses designed to take you from beginner to advanced in Classical Arabic
            </p>
          </div>

          {/* Search Bar */}
          <div className='relative mb-8 max-w-2xl mx-auto'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FaSearch className='text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search courses by title, description or subjects...'
              className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Skeleton Loader */}
          {loading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[...Array(6)].map((_, index) => (
                <div key={index} className='animate-pulse shadow-lg border border-gray-300 bg-gray-100 p-6 rounded-xl h-80'>
                  <div className='h-6 w-3/4 bg-gray-300 rounded mb-4'></div>
                  <div className='h-4 w-1/2 bg-gray-300 rounded mb-4'></div>
                  <div className='flex gap-2 mb-4'>
                    <div className='h-4 w-16 bg-gray-300 rounded'></div>
                    <div className='h-4 w-16 bg-gray-300 rounded'></div>
                  </div>
                  <div className='h-4 w-5/6 bg-gray-300 rounded mb-4'></div>
                  <div className='h-4 w-4/6 bg-gray-300 rounded mb-4'></div>
                  <div className='h-10 w-full bg-gray-300 rounded mt-6'></div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className='flex flex-col items-center text-gray-500 mt-8'>
              <FaBookOpen className='text-6xl mb-3 text-gray-400' />
              <p className='text-lg'>{searchTerm ? "No courses match your search" : "No courses available"}</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className='relative shadow-lg border border-gray-200 bg-white p-6 rounded-xl transition-all transform hover:scale-[1.02] hover:shadow-xl overflow-hidden group'
                >
                  {/* Course Icon based on type */}
                  <div className='absolute top-4 right-4 text-blue-600 opacity-20 group-hover:opacity-40 transition-opacity'>
                    {course.category === "quranic" ? (
                      <FaQuran size={40} />
                    ) : course.category === "modern" ? (
                      <GiArabicDoor size={40} />
                    ) : (
                      <FaMosque size={40} />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className='text-xl font-bold text-gray-900 mb-2 pr-8'>{course.title}</h3>

                  {/* Course Details */}
                  <div className='flex items-center text-sm text-gray-600 mb-3'>
                    <span className='font-medium text-blue-600 mr-2'>Duration:</span>
                    <span>{course.duration}</span>
                  </div>

                  {/* Course Subjects as Badges */}
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {course.subjects?.map((subject, index) => (
                      <span key={index} className='bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full'>
                        {subject}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className='text-gray-600 text-sm line-clamp-3 mb-6'>{course.description}</p>
                  <Link href={`/courses/${course._id}`}>
                    <button className='w-full mt-auto py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors'>
                      View Course Details
                    </button>
                  </Link>
                  {/* View Details Button */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
