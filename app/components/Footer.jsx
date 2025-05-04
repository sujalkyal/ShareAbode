"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"

const Footer = () => {
  const [email, setEmail] = useState("")

  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.footer
      className="w-full py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#854836" }}
      initial="hidden"
      animate="visible"
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4" style={{ color: "#F7F7F7" }}>
              StayNest
            </h3>
            <p className="mb-6 text-sm" style={{ color: "#F7F7F7" }}>
              Find your perfect stay with StayNest. Luxury accommodations for every traveler.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Twitter size={18} />} href="https://twitter.com" />
              <SocialIcon icon={<Instagram size={18} />} href="https://instagram.com" />
              <SocialIcon icon={<Linkedin size={18} />} href="https://linkedin.com" />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#F7F7F7" }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/listings">Listings</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#F7F7F7" }}>
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" style={{ color: "#FFB22C" }} />
                <span style={{ color: "#F7F7F7" }}>
                  123 Vacation Lane
                  <br />
                  Paradise City, PC 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" style={{ color: "#FFB22C" }} />
                <span style={{ color: "#F7F7F7" }}>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" style={{ color: "#FFB22C" }} />
                <span style={{ color: "#F7F7F7" }}>info@staynest.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#F7F7F7" }}>
              Subscribe to Our Newsletter
            </h3>
            <p className="mb-4 text-sm" style={{ color: "#F7F7F7" }}>
              Stay updated with our latest offers and properties.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FFB22C]"
                />
                <button
                  className="absolute right-1 top-1 p-1 rounded-md transition-colors duration-200"
                  style={{ backgroundColor: "#FFB22C" }}
                >
                  <ArrowRight size={20} color="#854836" />
                </button>
              </div>
              <p className="text-xs" style={{ color: "#F7F7F7" }}>
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px w-full my-8" style={{ backgroundColor: "rgba(247, 247, 247, 0.2)" }}></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0" style={{ color: "#F7F7F7" }}>
            © {new Date().getFullYear()} StayNest. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm transition-colors duration-200 hover:text-[#FFB22C]"
              style={{ color: "#F7F7F7" }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm transition-colors duration-200 hover:text-[#FFB22C]"
              style={{ color: "#F7F7F7" }}
            >
              Terms
            </Link>
            <Link
              href="/sitemap"
              className="text-sm transition-colors duration-200 hover:text-[#FFB22C]"
              style={{ color: "#F7F7F7" }}
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

// Footer Link Component
const FooterLink = ({ href, children }) => {
  return (
    <li>
      <Link
        href={href}
        className="inline-block transition-colors duration-200 hover:text-[#FFB22C] group"
        style={{ color: "#F7F7F7" }}
      >
        <span className="flex items-center">
          <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">•</span>
          {children}
        </span>
      </Link>
    </li>
  )
}

// Social Icon Component
const SocialIcon = ({ icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full transition-all duration-200 hover:scale-110"
      style={{
        backgroundColor: "rgba(255, 178, 44, 0.2)",
        color: "#FFB22C",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#FFB22C"
        e.currentTarget.style.color = "#854836"
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 178, 44, 0.2)"
        e.currentTarget.style.color = "#FFB22C"
      }}
    >
      {icon}
    </a>
  )
}

export default Footer
