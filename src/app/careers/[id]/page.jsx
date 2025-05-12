"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaExclamationCircle,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileUpload,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
  });

  const [status, setStatus] = useState({
    error: "",
    isSuccess: false,
  });
  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job");
        const data = await res.json();
        setJobData(data);
      } catch (error) {
        setStatus({ error: "Unable to fetch job details.", isSuccess: false });
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setStatus({ error: "", isSuccess: false });
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, resume: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ error: "", isSuccess: false });

    const { name, email, phone, resume } = formData;

    if (!name || !email || !phone || !resume) {
      setStatus({ error: "All fields are required.", isSuccess: false });
      return;
    }

    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(resume.type)) {
      setStatus({ error: "Please upload a valid PDF resume.", isSuccess: false });
      return;
    }

    if (resume.size > 5 * 1024 * 1024) {
      setStatus({ error: "File size must be under 5MB.", isSuccess: false });
      return;
    }

    setSubmitting(true);

    const body = new FormData();
    body.append("name", name.trim());
    body.append("email", email.trim().toLowerCase());
    body.append("phone", phone.trim());
    body.append("resume", resume);
    body.append("jobId", jobData._id);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setStatus({ error: "You have already applied for this job.", isSuccess: false });
        } else {
          setStatus({ error: data.message || "Failed to submit application.", isSuccess: false });
        }
        return;
      }

      setStatus({ error: "", isSuccess: true });
      setTimeout(() => router.push("/careers"), 2000);
    } catch (err) {
      setStatus({ error: "An unexpected error occurred. Please try again.", isSuccess: false });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Back Button Skeleton */}
          <div className='mb-6'>
            <Skeleton className='h-10 w-32 bg-gray-200 rounded-lg' />
          </div>

          {/* Job Header Skeleton */}
          <div className='mb-12'>
            <Skeleton className='h-12 w-3/4 bg-gray-200 rounded mb-6' />

            {/* Job Meta Skeleton */}
            <div className='flex flex-wrap gap-4 mb-6'>
              <Skeleton className='h-6 w-40 bg-gray-200 rounded' />
              <Skeleton className='h-6 w-32 bg-gray-200 rounded' />
              <Skeleton className='h-6 w-48 bg-gray-200 rounded' />
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Main Content Skeleton */}
            <div className='lg:col-span-2'>
              {/* Job Description Skeleton */}
              <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8'>
                <Skeleton className='h-8 w-48 bg-gray-200 rounded mb-6' />
                <div className='space-y-4'>
                  <Skeleton className='h-4 w-full bg-gray-200 rounded' />
                  <Skeleton className='h-4 w-5/6 bg-gray-200 rounded' />
                  <Skeleton className='h-4 w-4/6 bg-gray-200 rounded' />
                  <Skeleton className='h-4 w-3/4 bg-gray-200 rounded' />
                  <Skeleton className='h-4 w-5/6 bg-gray-200 rounded' />
                </div>
              </div>

              {/* Application Form Skeleton */}
              <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8'>
                <Skeleton className='h-8 w-64 bg-gray-200 rounded mb-6' />

                <div className='space-y-6'>
                  <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className='relative'>
                        <Skeleton className='h-5 w-24 bg-gray-200 rounded mb-2' />
                        <Skeleton className='h-10 w-full bg-gray-200 rounded-md' />
                      </div>
                    ))}
                  </div>

                  <Skeleton className='h-12 w-full bg-gray-200 rounded-md' />
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className='space-y-6'>
              <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-6'>
                <Skeleton className='h-8 w-40 bg-gray-200 rounded mb-6' />

                <div className='space-y-4'>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className='flex items-start space-x-3'>
                      <Skeleton className='h-10 w-10 bg-gray-200 rounded-lg' />
                      <div className='space-y-1'>
                        <Skeleton className='h-4 w-24 bg-gray-200 rounded' />
                        <Skeleton className='h-5 w-32 bg-gray-200 rounded' />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-6'>
                <Skeleton className='h-7 w-48 bg-gray-200 rounded mb-6' />

                <ul className='space-y-3'>
                  {[...Array(3)].map((_, i) => (
                    <li key={i} className='flex items-start space-x-3'>
                      <Skeleton className='h-5 w-5 bg-gray-200 rounded-full' />
                      <Skeleton className='h-5 w-48 bg-gray-200 rounded' />
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

  if (!jobData) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center p-8 max-w-md bg-white rounded-xl shadow-lg'>
          <div className='text-red-500 text-5xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>Job Not Found</h2>
          <p className='text-gray-600 mb-6'>{error}</p>
          <button
            onClick={() => (window.location.href = "/careers")}
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Browse All Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50  py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Back Button */}
        <div className='mb-6'>
          <button
            onClick={() => router.back()}
            className='inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors'
          >
            <FaArrowLeft className='mr-2' />
            Back to Jobs
          </button>
        </div>

        {/* Job Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>{jobData.title}</h1>

          {/* Job Meta */}
          <div className='flex flex-wrap gap-4 mb-6'>
            {jobData.location && (
              <div className='flex items-center text-gray-600'>
                <FaMapMarkerAlt className='mr-2 text-blue-600' />
                <span>{jobData.location}</span>
              </div>
            )}
            {jobData.salary && (
              <div className='flex items-center text-gray-600'>
                <FaMoneyBillWave className='mr-2 text-blue-600' />
                <span>{jobData.salary}</span>
              </div>
            )}
            {jobData.deadline && (
              <div className='flex items-center text-gray-600'>
                <FaClock className='mr-2 text-blue-600' />
                <span>Apply by {new Date(jobData.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2'>
            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8'
            >
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>Job Description</h2>
              <div className='prose max-w-none text-gray-700'>
                {jobData.description.split("\n").map((paragraph, i) => (
                  <p key={i} className='mb-4'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8'
            >
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>Apply for this Position</h2>

              {status.error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3'
                >
                  <FaExclamationCircle className='text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0' />
                  <p className='text-red-700 dark:text-red-300'>{status.error}</p>
                </motion.div>
              )}

              {status.isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-start gap-3'
                >
                  <FaCheckCircle className='text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0' />
                  <p className='text-emerald-700 dark:text-emerald-300'>Message sent successfully! We'll get back to you soon.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                  <div className='relative'>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                      Full Name
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <FaUser className='text-gray-400' />
                      </div>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className='pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2'
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div className='relative'>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                      Email
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <FaEnvelope className='text-gray-400' />
                      </div>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className='pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2'
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div className='relative'>
                    <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-1'>
                      Phone Number
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <FaPhone className='text-gray-400' />
                      </div>
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className='pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2'
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div className='relative'>
                    <label htmlFor='resume' className='block text-sm font-medium text-gray-700 mb-1'>
                      Resume (PDF only)
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <FaFileUpload className='text-gray-400' />
                      </div>
                      <input
                        type='file'
                        id='resume'
                        name='resume'
                        accept='.pdf'
                        onChange={handleChange}
                        required
                        className='pl-10 block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                        disabled={submitting}
                      />
                    </div>
                    {formData.resume && (
                      <p className='mt-1 text-sm text-gray-500'>
                        Selected: <span className='font-medium'>{formData.resume.name}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className='pt-2'>
                  <motion.button
                    type='submit'
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
                  >
                    {submitting ? (
                      <>
                        <svg
                          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200'
            >
              <div className='p-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>Job Details</h3>

                <div className='space-y-4'>
                  {jobData.location && (
                    <div className='flex items-start space-x-3'>
                      <div className='p-2 bg-blue-100 rounded-lg text-blue-600'>
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>Location</p>
                        <p className='font-medium'>{jobData.location}</p>
                      </div>
                    </div>
                  )}

                  {jobData.salary && (
                    <div className='flex items-start space-x-3'>
                      <div className='p-2 bg-blue-100 rounded-lg text-blue-600'>
                        <FaMoneyBillWave />
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>Salary</p>
                        <p className='font-medium'>{jobData.salary}</p>
                      </div>
                    </div>
                  )}

                  {jobData.deadline && (
                    <div className='flex items-start space-x-3'>
                      <div className='p-2 bg-blue-100 rounded-lg text-blue-600'>
                        <FaClock />
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>Application Deadline</p>
                        <p className='font-medium'>{new Date(jobData.deadline).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-6'
            >
              <h3 className='text-lg font-bold text-gray-900 mb-4'>What We Offer</h3>
              <ul className='space-y-3'>
                <li className='flex items-start space-x-3'>
                  <div className='h-5 w-5 rounded-full bg-green-100 flex items-center justify-center'>
                    <svg className='h-3 w-3 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <span className='text-gray-700'>Competitive compensation</span>
                </li>
                <li className='flex items-start space-x-3'>
                  <div className='h-5 w-5 rounded-full bg-green-100 flex items-center justify-center'>
                    <svg className='h-3 w-3 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <span className='text-gray-700'>Professional growth opportunities</span>
                </li>
                <li className='flex items-start space-x-3'>
                  <div className='h-5 w-5 rounded-full bg-green-100 flex items-center justify-center'>
                    <svg className='h-3 w-3 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <span className='text-gray-700'>Collaborative work environment</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
