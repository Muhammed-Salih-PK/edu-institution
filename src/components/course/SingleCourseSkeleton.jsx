"use client";

import { FaArrowLeft, FaClock, FaMoneyBillWave } from "react-icons/fa";

export function SingleCourseSkeleton() {
  return (
    <div className='min-h-screen bg-gray-50 py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Back Button Skeleton */}
        <div className='mb-6'>
          <div className='inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg w-24 h-10'></div>
        </div>

        {/* Course Header Skeleton */}
        <div className='mb-12'>
          <div className='h-12 w-3/4 bg-gray-200 rounded mb-6'></div>

          {/* Course Meta Skeleton */}
          <div className='flex flex-wrap gap-4 mb-6'>
            <div className='flex items-center h-6 w-40 bg-gray-200 rounded'></div>
            <div className='flex items-center h-6 w-32 bg-gray-200 rounded'></div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content Skeleton */}
          <div className='lg:col-span-2'>
            {/* Course Description Skeleton */}
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8'>
              <div className='h-8 w-48 bg-gray-200 rounded mb-6'></div>
              <div className='space-y-4'>
                <div className='h-4 w-full bg-gray-200 rounded'></div>
                <div className='h-4 w-5/6 bg-gray-200 rounded'></div>
                <div className='h-4 w-3/4 bg-gray-200 rounded'></div>
                <div className='h-4 w-4/5 bg-gray-200 rounded'></div>
              </div>
            </div>

            {/* Subjects Skeleton */}
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8'>
              <div className='flex justify-between items-center'>
                <div className='h-8 w-48 bg-gray-200 rounded'></div>
                <div className='h-5 w-5 bg-gray-200 rounded-full'></div>
              </div>
              <div className='pt-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className='h-5 w-3/4 bg-gray-200 rounded'></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className='space-y-6'>
            <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-6'>
              <div className='h-8 w-40 bg-gray-200 rounded mb-6'></div>

              <div className='space-y-4'>
                <div className='flex items-start space-x-3'>
                  <div className='p-2 bg-blue-100 rounded-lg text-blue-600 w-10 h-10'></div>
                  <div>
                    <div className='h-4 w-24 bg-gray-200 rounded mb-2'></div>
                    <div className='h-5 w-32 bg-gray-200 rounded'></div>
                  </div>
                </div>

                <div className='flex items-start space-x-3'>
                  <div className='p-2 bg-blue-100 rounded-lg text-blue-600 w-10 h-10'></div>
                  <div>
                    <div className='h-4 w-24 bg-gray-200 rounded mb-2'></div>
                    <div className='h-5 w-32 bg-gray-200 rounded'></div>
                  </div>
                </div>

                <div className='pt-4 border-t border-gray-200'>
                  <div className='h-12 w-full bg-gray-200 rounded-lg'></div>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-6'>
              <div className='h-7 w-48 bg-gray-200 rounded mb-6'></div>

              <ul className='space-y-3'>
                {[...Array(3)].map((_, i) => (
                  <li key={i} className='flex items-start space-x-3'>
                    <div className='h-5 w-5 bg-gray-200 rounded-full'></div>
                    <div className='h-5 w-48 bg-gray-200 rounded'></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CourseError({ error }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4'>
      <div className='text-center p-8 max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100'>
        <div className='text-6xl mb-4 animate-bounce'>⚠️</div>
        <h2 className='text-3xl font-extrabold text-gray-800 mb-3'>Oops! Course Not Found</h2>
        <p className='text-gray-500 mb-8 leading-relaxed'>{error || "The course you're looking for doesn't exist or has been removed."}</p>
        <button
          onClick={() => (window.location.href = "/courses")}
          className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-transform duration-200'
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 10h11M3 6h11m-7 8h7m4 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 8h4'
            />
          </svg>
          Browse All Courses
        </button>
      </div>
    </div>
  );
}
