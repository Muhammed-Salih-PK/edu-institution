"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

import { FAQSection } from "./components/FAQSection";
import { ContactUs } from "./components/ContactUs";
import Footer from "./components/footer";
import Hero from "./components/Hero";
import CourseShowcase from "./components/CourseShowcase";

export default function Home() {
  return (
    <div className='bg-slate-50 min-h-screen flex flex-col overflow-hidden'>
      
      {/* Hero Section */}
      <Hero/>

      {/* Features Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center max-w-3xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-900'>Our Methodology</h2>
            <p className='mt-4 text-lg text-slate-600'>We combine traditional Arabic teaching with modern techniques for effective learning.</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
            {[
              {
                icon: (
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                    />
                  </svg>
                ),
                title: "Native Instructors",
                description: "Learn from qualified Arabic teachers with native proficiency.",
              },
              {
                icon: (
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                ),
                title: "Structured Curriculum",
                description: "Progressive learning path from beginner to advanced levels.",
              },
              {
                icon: (
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                    />
                  </svg>
                ),
                title: "Interactive Sessions",
                description: "Live classes with focus on conversation and practical usage.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-blue-300 transition-all'
              >
                <div className='w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4'>{feature.icon}</div>
                <h3 className='text-xl font-semibold text-slate-800'>{feature.title}</h3>
                <p className='mt-2 text-slate-600'>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      
      {/* About Us Section */}
      <section className='py-16 bg-gradient-to-br from-blue-50 to-slate-100'>
        <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12'>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className='w-full md:w-1/2 flex justify-center'
          >
            <div className='relative w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-lg'>
              <Image src='/img/mosque-class.webp' alt='About EduMosaic Academy' fill className='object-cover' />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className='w-full md:w-1/2 text-center md:text-left'
          >
            <span className='text-sm font-medium text-blue-600 uppercase tracking-wider'>About Us</span>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-900 mt-2'>Preserving the Language of the Quran</h2>
            <p className='mt-4 text-lg text-slate-700'>
              At EduMosaic Academy, we're dedicated to teaching Classical Arabic with authenticity and excellence. Our mission is to make Arabic accessible to students worldwide.
            </p>
            <p className='mt-4 text-lg text-slate-700'>
              Founded by Arabic language scholars, we combine traditional teaching methods with modern technology to deliver effective language instruction.
            </p>
            <div className='mt-8 grid grid-cols-2 gap-4'>
              <div>
                <p className='text-3xl font-bold text-blue-600'>10+</p>
                <p className='text-slate-600'>Years Experience</p>
              </div>
              <div>
                <p className='text-3xl font-bold text-blue-600'>500+</p>
                <p className='text-slate-600'>Students Taught</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Showcase */}
      <CourseShowcase/>

      {/* Testimonials */}
      <section className='py-16 bg-slate-50'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center max-w-3xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-900'>Success Stories</h2>
            <p className='mt-4 text-lg text-slate-600'>Hear from our students who transformed their careers</p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12'>
            {[
              {
                quote: "The courses gave me the skills I needed to transition into tech. Within 3 months I landed my dream job!",
                name: "Sarah Johnson",
                role: "Data Analyst at TechCorp",
              },
              {
                quote: "The community support was incredible. I never felt alone in my learning journey.",
                name: "Michael Chen",
                role: "UX Designer at DesignHub",
              },
              {
                quote: "The career services team helped me polish my portfolio and prepare for interviews. Game changer!",
                name: "Alex Rodriguez",
                role: "Digital Marketer at GrowthCo",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow'
              >
                <svg className='w-8 h-8 text-indigo-200 mb-4' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
                <p className='text-lg text-slate-700 italic'>"{testimonial.quote}"</p>
                <div className='mt-6'>
                  <p className='font-medium text-slate-900'>{testimonial.name}</p>
                  <p className='text-sm text-slate-500'>{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-gradient-to-r from-indigo-600 to-indigo-800'>
        <div className='max-w-4xl mx-auto px-6 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white'>Ready to Transform Your Career?</h2>
          <p className='mt-4 text-lg text-indigo-100 max-w-2xl mx-auto'>
            Join thousands of learners who've accelerated their careers with our programs.
          </p>
          <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/signup'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-8 py-3.5 bg-white text-indigo-700 hover:bg-slate-100 text-lg font-semibold rounded-lg shadow-lg transition-all'
              >
                Get Started Today
              </motion.button>
            </Link>
            <Link href='/courses'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-8 py-3.5 border-2 border-white text-white hover:bg-indigo-700 text-lg font-semibold rounded-lg transition-all'
              >
                Explore Courses
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ & Contact */}
      <FAQSection />
      <ContactUs />

      {/* Footer */}
      <Footer />
    </div>
  );
}
