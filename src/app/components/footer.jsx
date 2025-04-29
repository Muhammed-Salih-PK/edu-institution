"use client";

import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">EduPro</h3>
            <p className="text-sm">
              Empowering the future through innovative education solutions since 2015.
            </p>
            <div className="flex gap-4 text-lg">
              <a 
                href="#" 
                className="hover:text-white transition hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="#" 
                className="hover:text-white transition hover:-translate-y-1"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="#" 
                className="hover:text-white transition hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a 
                href="#" 
                className="hover:text-white transition hover:-translate-y-1"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition hover:pl-1 block">Home</a></li>
              <li><a href="#" className="hover:text-white transition hover:pl-1 block">Courses</a></li>
              <li><a href="#" className="hover:text-white transition hover:pl-1 block">About Us</a></li>
              <li><a href="#" className="hover:text-white transition hover:pl-1 block">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition hover:pl-1 block">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <p>123 Education St, Learning City, 10101</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope />
                <a href="mailto:info@edupro.com" className="hover:text-white transition">info@edupro.com</a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone />
                <a href="tel:+11234567890" className="hover:text-white transition">+1 (123) 456-7890</a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Newsletter</h4>
            <p className="text-sm">
              Subscribe to our newsletter for the latest updates and course offerings.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} EduPro. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}