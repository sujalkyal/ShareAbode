"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
      style={{ backgroundColor: "#F7F7F7" }}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/homes" className="flex items-center">
              <>
                <Image
                  src="/no_bg_house.png"
                  alt="ShareAbode Logo"
                  width={50}
                  height={50}
                  className="mr-2"
                />
                <span
                  className="text-xl font-bold"
                  style={{ color: "#000000" }}
                >
                  ShareAbode
                </span>
              </>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/homes">Homes</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/addHome">New Property</NavLink>
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center">
            <button
              className="px-4 py-2 rounded-md font-medium transition-colors duration-200"
              style={{
                backgroundColor: "#FFB22C",
                color: "#000000",
                border: "2px solid transparent",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#f0a520";
                e.currentTarget.style.borderColor = "#854836";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#FFB22C";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              Log Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-5">
                <motion.span
                  className="absolute h-0.5 w-6 transform transition-all duration-300"
                  style={{
                    backgroundColor: "#000000",
                    top: "0%",
                  }}
                  animate={{
                    top: isOpen ? "50%" : "0%",
                    rotate: isOpen ? "45deg" : "0deg",
                  }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 top-1/2 -translate-y-1/2 transform transition-all duration-300"
                  style={{ backgroundColor: "#000000" }}
                  animate={{
                    opacity: isOpen ? 0 : 1,
                  }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 transform transition-all duration-300"
                  style={{
                    backgroundColor: "#000000",
                    bottom: "0%",
                  }}
                  animate={{
                    bottom: isOpen ? "50%" : "0%",
                    rotate: isOpen ? "-45deg" : "0deg",
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="px-4 pt-2 pb-4 space-y-1 bg-white shadow-lg">
              <MobileNavLink href="/homes" variants={linkVariants}>
                Homes
              </MobileNavLink>
              <MobileNavLink href="/about" variants={linkVariants}>
                About
              </MobileNavLink>
              <MobileNavLink href="/contact" variants={linkVariants}>
                Contact
              </MobileNavLink>

              <motion.div variants={linkVariants} className="pt-2">
                <button
                  className="w-full px-4 py-2 rounded-md font-medium text-center"
                  style={{
                    backgroundColor: "#FFB22C",
                    color: "#000000",
                  }}
                >
                  Log Out
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="relative text-black font-medium hover:text-gray-900 transition-colors duration-200 group"
    >
      {children}
      <span
        className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#854836] transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: "#854836" }}
      ></span>
    </Link>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ href, children, variants }) => {
  return (
    <motion.div variants={variants}>
      <Link
        href={href}
        className="flex py-2 px-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors duration-200 justify-center"
        style={{ color: "#000000" }}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default Navbar;
