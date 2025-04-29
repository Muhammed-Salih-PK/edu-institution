// app/careers/page.js
"use client";

import { useEffect, useState } from "react";
import { FiBook, FiMapPin, FiDollarSign, FiClock, FiArrowRight, FiFilter } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/jobs/active");
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Fetch error:");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    if (filter === "all") return true;
    if (["engineering", "design", "marketing"].includes(filter)) {
      return job.department === filter;
    }
    if (filter === "remote") return job.locationType === "remote";
    if (filter === "full-time") return job.employmentType === "full-time";
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const departmentColors = {
    engineering: "bg-purple-100 text-purple-800",
    design: "bg-pink-100 text-pink-800",
    marketing: "bg-blue-100 text-blue-800",
  };

  return (
    <div className='min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8'>
      {/* Hero Section */}
      <div className='max-w-7xl mx-auto text-center mb-12'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-4xl font-bold text-gray-900 sm:text-5xl mb-6'
        >
          Join Our Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='text-xl text-gray-600 max-w-3xl mx-auto'
        >
          We're building the future together. Find your perfect role and grow with us.
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className='max-w-7xl mx-auto mb-12'>
        <div className='flex flex-wrap justify-center gap-2 mb-6'>
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Jobs
          </button>
          <button
            onClick={() => setFilter("engineering")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "engineering" ? "bg-purple-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Engineering
          </button>
          <button
            onClick={() => setFilter("design")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "design" ? "bg-pink-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Design
          </button>
          <button
            onClick={() => setFilter("marketing")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "marketing" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Marketing
          </button>
          <button
            onClick={() => setFilter("remote")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "remote" ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Remote
          </button>
          <button
            onClick={() => setFilter("full-time")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "full-time" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Full-time
          </button>
        </div>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-2xl font-semibold text-gray-900'>
            {filter === "all" ? "All Open Positions" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Jobs`}
          </h2>
          <p className='text-sm text-gray-500'>
            {filteredJobs.length} {filteredJobs.length === 1 ? "position" : "positions"} available
          </p>
        </div>
      </motion.div>

      {/* Jobs grid */}
      <div className='max-w-7xl mx-auto'>
        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 flex flex-col h-full'>
                <div className='flex justify-between items-center mb-4'>
                  <Skeleton className='h-6 w-2/3 rounded-md' />
                  <Skeleton className='h-5 w-16 rounded-full' />
                </div>
                <div className='mb-4 flex-grow space-y-2'>
                  <Skeleton className='h-4 w-full rounded' />
                  <Skeleton className='h-4 w-5/6 rounded' />
                </div>
                <div className='space-y-3 mb-6'>
                  <Skeleton className='h-4 w-1/2 rounded' />
                  <Skeleton className='h-4 w-1/3 rounded' />
                  <Skeleton className='h-4 w-2/3 rounded' />
                </div>
                <Skeleton className='h-10 w-full rounded-md' />
              </div>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          >
            <AnimatePresence>
              {filteredJobs.map((job) => (
                <motion.div
                  key={job._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow'
                >
                  <div className='p-6 h-full flex flex-col'>
                    <div className='flex justify-between items-start mb-3'>
                      <h3 className='text-xl font-semibold text-gray-900'>{job.title}</h3>
                      {job.department && (
                        <span className={`text-xs px-2 py-1 rounded-full ${departmentColors[job.department] || "bg-gray-100 text-gray-800"}`}>
                          {job.department.charAt(0).toUpperCase() + job.department.slice(1)}
                        </span>
                      )}
                    </div>
                    <p className='text-gray-600 text-sm line-clamp-2 mb-4 flex-grow'>{job.description}</p>

                    <div className='space-y-3 mb-6'>
                      <div className='flex items-center text-sm text-gray-600'>
                        <FiMapPin className='mr-2 text-blue-500 flex-shrink-0' />
                        <span>
                          {job.locationType === "remote" ? "Remote" : job.location}
                          {job.locationType === "hybrid" && " (Hybrid)"}
                        </span>
                      </div>
                      <div className='flex items-center text-sm text-gray-600'>
                        <FiDollarSign className='mr-2 text-blue-500 flex-shrink-0' />
                        <span>{job.salary}</span>
                      </div>
                      <div className='flex items-center text-sm text-gray-600'>
                        <FiClock className='mr-2 text-blue-500 flex-shrink-0' />
                        <span>Apply by {formatDate(job.deadline)}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push(`/careers/${job._id}`)}
                      className='mt-auto w-full flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors'
                    >
                      Apply now <FiArrowRight className='ml-2' />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center py-12 bg-white rounded-lg shadow-sm'>
            <FiFilter className='mx-auto text-4xl text-gray-400 mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No jobs found</h3>
            <p className='text-gray-500 max-w-md mx-auto'>
              There are currently no open positions matching your filter. Try a different filter or check back later.
            </p>
            <button onClick={() => setFilter("all")} className='mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors'>
              Reset filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
