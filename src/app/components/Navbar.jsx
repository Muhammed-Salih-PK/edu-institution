"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaPhoneAlt,
  FaHome,
  FaGraduationCap,
  FaInfoCircle,
  FaEnvelope,
  FaBriefcase,
  FaUserGraduate,
  FaBookOpen,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { RiLiveLine } from "react-icons/ri";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    { label: "Home", path: "/", icon: <FaHome /> },
    { label: "Courses", path: "/courses", icon: <FaGraduationCap /> },
    { label: "About", path: "/about", icon: <FaInfoCircle /> },
    { label: "Contact", path: "/contact", icon: <FaEnvelope /> },
    { label: "Careers", path: "/careers", icon: <FaBriefcase /> },
  ];

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      x: "100%",
      transition: { ease: "easeInOut", duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
    }),
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white dark:bg-gray-900 }`}>
      <div className='container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center'>
        {/* Logo */}
        <Link href='/' className='flex items-center group'>
          <motion.span
            className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className='flex items-center'>
              <FaUserGraduate className='mr-2' />
              EduMosaic
              <span className='text-xs align-super ml-1 bg-emerald-500 text-white px-1.5 py-0.5 rounded-full'>Pro</span>
            </span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-1 lg:space-x-2'>
          {navItems.slice(0, 4).map(({ label, path, icon }, i) => (
            <motion.div key={label} custom={i} initial='hidden' animate='visible' variants={itemVariants}>
              <Link
                href={path}
                className={`relative group flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  pathname === path
                    ? "text-emerald-500 dark:text-emerald-400 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400"
                }`}
              >
                <span className={`${pathname === path ? "text-emerald-500" : "opacity-70"}`}>{icon}</span>
                {label}
                <span
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 ${
                    pathname === path ? "w-4/5 bg-emerald-500" : "w-0 bg-emerald-500 group-hover:w-4/5"
                  } transition-all duration-300`}
                ></span>
              </Link>
            </motion.div>
          ))}

          <motion.div className='relative group ml-2' whileHover={{ scale: 1.05 }}>
            <button className='flex items-center gap-1.5 px-3 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:text-emerald-500 dark:hover:text-emerald-400'>
              <span>More</span>
              <svg className='w-4 h-4 transition-transform group-hover:rotate-180' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>

            <div className='absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1 z-50'>
              {navItems.slice(4).map(({ label, path }) => (
                <Link
                  key={label}
                  href={path}
                  className={`block px-4 py-2 text-sm ${
                    pathname === path
                      ? "bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className='md:hidden text-gray-700 dark:text-gray-300 p-2 rounded-lg focus:outline-none'
          onClick={() => setMenuOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label='Open menu'
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <FaBars className='text-xl' />
        </motion.button>

        {/* Mobile Sidebar Menu */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                className='fixed h-full bg-black/30 backdrop-blur-sm z-40'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              />

              <motion.div
                className='fixed inset-y-0 right-0 w-4/5 max-w-xs z-50 bg-white dark:bg-gray-800 shadow-xl flex flex-col'
                variants={mobileMenuVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
              >
                <div className='flex justify-between items-center px-6 py-5 border-b border-gray-200 dark:border-gray-700'>
                  <span className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Menu</span>
                  <motion.button
                    className='text-gray-700 dark:text-gray-300 p-1 rounded-full'
                    onClick={() => setMenuOpen(false)}
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label='Close menu'
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <FaTimes className='text-xl' />
                  </motion.button>
                </div>

                <div className='h-full px-4 py-2'>
                  {navItems.map(({ label, path, icon }, i) => (
                    <motion.div key={label} custom={i} initial='hidden' animate='visible' variants={itemVariants}>
                      <Link
                        href={path}
                        className={`flex items-center gap-3 px-4 py-3 text-lg font-medium ${
                          pathname === path
                            ? "bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        } rounded-lg transition-colors`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className={`${pathname === path ? "text-emerald-500" : "opacity-70"}`}>{icon}</span>
                        {label}
                        {pathname === path && <span className='ml-auto w-2 h-2 bg-emerald-500 rounded-full'></span>}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href='/contact'
                      className='flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all'
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaPhoneAlt />
                      <span className='font-medium'>Contact Now</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
