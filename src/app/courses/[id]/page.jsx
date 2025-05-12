"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaBookOpen, FaClock, FaMoneyBillWave, FaChevronDown, FaArrowLeft, FaCheck, FaChalkboardTeacher, FaCertificate } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SingleCourseSkeleton, CourseError } from "@/components/course/SingleCourseSkeleton";
export default function SingleCourse() {
  const { id } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setCourse(data);
      } catch (error) {
        setError("Unable to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (loading) {
    return <SingleCourseSkeleton />;
  }

  if (error) {
    return <CourseError error={error} />;
  }

  if (!course) return null;

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-22'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Navigation */}
        <div className='mb-8'>
          <button
            onClick={() => router.back()}
            className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200'
          >
            <FaArrowLeft className='text-blue-600' />
            Back to Courses
          </button>
        </div>

        {/* Course Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className='mb-12'>
          <div className='flex flex-col md:flex-row justify-between gap-6'>
            <div>
              <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>{course.title}</h1>
              <p className='text-lg text-gray-600 max-w-3xl'>{course.shortDescription}</p>
            </div>
            
          </div>

          {/* Course Meta */}
          <div className='flex flex-wrap gap-4 mt-6'>
            {course.duration && (
              <div className='flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200'>
                <FaClock className='text-blue-600' />
                <span className='text-gray-700'>{course.duration}</span>
              </div>
            )}
            {course.fee && (
              <div className='flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200'>
                <FaMoneyBillWave className='text-blue-600' />
                <span className='text-gray-700'>${course.fee}</span>
              </div>
            )}
            {course.level && (
              <div className='flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200'>
                <span className='text-gray-700'>{course.level}</span>
              </div>
            )}
          </div>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Course Image */}
            {course.image && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg'
              >
                <Image src={course.image} alt={course.title} fill className='object-cover' priority />
              </motion.div>
            )}

            {/* Course Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'
            >
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>About This Course</h2>
              <div className='prose max-w-none text-gray-700 space-y-4'>
                {course.description.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            {/* What You'll Learn */}
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'
              >
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>What You'll Learn</h2>
                <ul className='space-y-3'>
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index} className='flex items-start gap-3'>
                      <FaCheck className='text-green-500 mt-1 flex-shrink-0' />
                      <span className='text-gray-700'>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Subjects */}
            {course.subjects && course.subjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'
              >
                <button onClick={() => toggleSection("subjects")} className='w-full flex justify-between items-center'>
                  <h2 className='text-2xl font-bold text-gray-900'>Course Curriculum</h2>
                  <FaChevronDown
                    className={`text-gray-500 transition-transform duration-200 ${expandedSection === "subjects" ? "transform rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {expandedSection === "subjects" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className='overflow-hidden pt-4'
                    >
                      <ul className='space-y-3'>
                        {course.subjects.map((subject, index) => (
                          <li key={index} className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                            <span className='text-blue-600'>•</span>
                            <span className='text-gray-700'>{subject}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Course Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200'
            >
              <div className='p-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>Course Details</h3>

                <div className='space-y-4'>
                  {course.startDate && (
                    <div className='flex items-start gap-3'>
                      <div className='p-2 bg-blue-100 rounded-lg text-blue-600'>
                        <FaCalendarAlt />
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>Start Date</p>
                        <p className='font-medium'>
                          {new Date(course.startDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {course.duration && (
                    <div className='flex items-start gap-3'>
                      <div className='p-2 bg-blue-100 rounded-lg text-blue-600'>
                        <FaClock />
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>Duration</p>
                        <p className='font-medium'>{course.duration}</p>
                      </div>
                    </div>
                  )}

                  {course.fee && (
                    <div className='flex items-start gap-3'>
                      <div className='p-2 bg-blue-100 rounded-lg text-blue-600'>
                        <FaMoneyBillWave />
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>Course Fee</p>
                        <p className='font-medium'>${course.fee}</p>
                      </div>
                    </div>
                  )}

                  <div className='pt-4'>
                    <button className='w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'>
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Course Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-6'
            >
              <h3 className='text-lg font-bold text-gray-900 mb-4'>Course Benefits</h3>
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <div className='p-2 bg-green-100 rounded-lg text-green-600'>
                    <FaChalkboardTeacher />
                  </div>
                  <div>
                    <p className='font-medium text-gray-800'>Expert Instruction</p>
                    <p className='text-sm text-gray-600'>Learn from industry professionals</p>
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='p-2 bg-green-100 rounded-lg text-green-600'>
                    <FaCertificate />
                  </div>
                  <div>
                    <p className='font-medium text-gray-800'>Certification</p>
                    <p className='text-sm text-gray-600'>Earn a certificate upon completion</p>
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='p-2 bg-green-100 rounded-lg text-green-600'>
                    <FaBookOpen />
                  </div>
                  <div>
                    <p className='font-medium text-gray-800'>Comprehensive Materials</p>
                    <p className='text-sm text-gray-600'>Access to all course resources</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Instructor */}
            {course.instructor && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-6'
              >
                <h3 className='text-lg font-bold text-gray-900 mb-4'>Your Instructor</h3>
                <div className='flex items-center gap-4'>
                  <div className='relative h-16 w-16 rounded-full overflow-hidden border-2 border-blue-100'>
                    <Image
                      src={course.instructor.image || "/images/default-instructor.jpg"}
                      alt={course.instructor.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div>
                    <p className='font-medium text-gray-800'>{course.instructor.name}</p>
                    <p className='text-sm text-gray-600'>{course.instructor.qualification}</p>
                  </div>
                </div>
                <p className='mt-4 text-gray-700 text-sm'>{course.instructor.bio}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
