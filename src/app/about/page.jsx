"use client";

import { motion } from "framer-motion";
import { FaLightbulb, FaHandshake, FaMedal, FaUsers, FaGraduationCap, FaBookOpen } from "react-icons/fa";

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const valueCards = [
    { icon: <FaMedal className="text-3xl text-amber-500" />, title: "Excellence", description: "Striving for the highest academic and personal standards" },
    { icon: <FaHandshake className="text-3xl text-blue-500" />, title: "Integrity", description: "Instilling honesty, ethics, and accountability" },
    { icon: <FaLightbulb className="text-3xl text-green-500" />, title: "Innovation", description: "Encouraging creativity and problem-solving skills" },
    { icon: <FaUsers className="text-3xl text-purple-500" />, title: "Community", description: "Building strong connections between all stakeholders" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center py-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-6xl w-full grid gap-16"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Hero Section */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">EduMosaic</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            EduMosaic Academy is a premier educational institution in Abu Dhabi, dedicated to 
            providing an innovative and holistic learning experience that shapes students into 
            responsible global citizens.
          </motion.p>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          className="relative rounded-2xl overflow-hidden shadow-xl"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.01 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
            alt="EduMosaic Academy Campus" 
            className="w-full h-auto object-cover aspect-video"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end p-8">
            <motion.div 
              className="text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FaGraduationCap className="text-4xl mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Our Inspiring Campus</h2>
              <p className="text-gray-200 max-w-lg">A state-of-the-art learning environment designed to foster creativity and collaboration</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission & Vision Section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        >
          {/* Mission */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                <FaBookOpen className="text-blue-600 dark:text-blue-400 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To foster a learning environment that encourages curiosity, creativity, and excellence. 
              We equip students with the knowledge and skills needed to thrive in a rapidly evolving world, 
              while nurturing their personal growth and social responsibility.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                <FaLightbulb className="text-purple-600 dark:text-purple-400 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To be recognized as a regional leader in academic excellence that prepares students 
              for higher education, career success, and meaningful contributions to society through 
              innovative teaching methods and holistic development programs.
            </p>
          </div>
        </motion.div>

        {/* Core Values Section */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            The foundational principles that guide everything we do at EduMosaic Academy
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueCards.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                {item.icon}
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ready to join our learning community?</h3>
          <motion.a
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us Today
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}