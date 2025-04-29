"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news"); // Replace with actual API
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setNews(data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Heading Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold text-gray-800 text-center"
      >
        Latest News
      </motion.h1>

      {/* Error Handling */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-red-500 mt-4"
        >
          <p>Error: {error}</p>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-600 mt-4"
        >
          Loading news...
        </motion.p>
      )}

      {/* News List */}
      {!loading && !error && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {news.map((article, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg p-5 rounded-lg border border-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold text-gray-900">{article.title}</h3>
              <p className="text-gray-600 mt-2">{article.description || "No description available."}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-500 font-medium mt-3 inline-block"
              >
                Read More →
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
