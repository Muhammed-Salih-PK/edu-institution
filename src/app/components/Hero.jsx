import React from 'react'
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; 


const Hero = () => {
  return (
    <div>
      <section className='relative overflow-hidden'>
        {/* Background Gradient */}
        <div className='absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 transform skew-y-3 -rotate-3 origin-top-left'></div>

        <div className='max-w-7xl mx-auto px-6 py-24 md:py-28 flex flex-col lg:flex-row items-center gap-6 sm:gap-10 md:gap-12 relative z-10'>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='lg:w-1/2 space-y-8 text-center lg:text-left'
          >
            <div className='inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4'>
              <span className='w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse'></span>
              New: Intensive Arabic Program
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
              <span className='relative'>
                <span className='relative z-10'>Master Arabic</span>
                <span className='absolute bottom-2 left-0 w-full h-3 bg-indigo-200/60 z-0'></span>
              </span>
              <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500'>communicate Faster</span>
            </h1>

            <p className='text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0'>
              Join 10,000+ professionals who transformed their careers with our project-based learning approach and career coaching.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
              <Link href='/courses'>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className='px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2'
                >
                  Explore Courses
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </motion.button>
              </Link>
              <Link href='/demo'>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className='px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2'
                >
                  Watch Demo
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-indigo-600' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                      clipRule='evenodd'
                    />
                  </svg>
                </motion.button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className='pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-gray-500'>
              <div className='flex items-center'>
                <div className='flex -space-x-2 mr-3'>
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className='h-8 w-8 rounded-full bg-white border-2 border-white overflow-hidden'>
                      {/* Placeholder for user avatars */}
                      <div className='bg-indigo-100 h-full w-full'></div>
                    </div>
                  ))}
                </div>
                <span>Trusted by 10K+ learners</span>
              </div>
              <div className='hidden sm:block h-4 w-px bg-gray-300'></div>
              <div className='flex items-center'>
                <div className='flex mr-2'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className='w-4 h-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>
                <span>4.9/5 (2,500 reviews)</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className='lg:w-1/2 relative mt-12 lg:mt-0'
          >
            <div className='md:relative flex w-full max-w-xl md:aspect-[1.1] gap-5 mx-auto'>
              {/* Main hero image */}
              <Image src='/img/hero-image.png' alt='Happy students learning' fill className='object-contain hidden md:block' priority />

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className='md:absolute md:-left-8 md:-top-8 bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-24 h-24 md:flex md:items-center md:justify-center'
              >
                <div className='text-center'>
                  <span className='text-2xl font-bold text-indigo-600'>90%</span>
                  <p className='text-xs text-gray-500'>Success Rate</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className='md:absolute md:-right-8 md:-bottom-8 bg-indigo-600 p-3 rounded-xl shadow-lg w-20 h-20 md:flex md:items-center md:justify-center'
              >
                <div className='text-center text-white'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 mx-auto' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  <p className='text-xs mt-1'>Certified</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scrolling partner logos */}
        <div className='relative bg-white py-6 border-t border-gray-100'>
          <div className='max-w-7xl mx-auto px-6 overflow-hidden'>
            <p className='text-center text-sm text-gray-500 mb-4'>Trusted by teams at</p>
            <div className='flex items-center justify-center space-x-12 animate-marquee whitespace-nowrap'>
              {["Islamic University", "Quran Academy", "Arabic Institute", "Madinah University", "Al-Azhar", "ISESCO"].map((company) => (
                <div key={company} className='text-gray-400 font-medium text-lg opacity-60 hover:opacity-100 transition-opacity'>
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
