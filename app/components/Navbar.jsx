"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

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
            <NavLink href="/homes">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/addHome">New Property</NavLink>
          </div>

          {/* Profile and Logout */}
          {session && (
            <div className="hidden md:flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2"
              >
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  <Image
                    src="/user-placeholder.png"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-black">
                    {session.user.name || session.user.email.split("@")[0]}
                  </span>
                </Link>
              </motion.div>

              <button
                className="px-4 py-2 rounded-md font-medium transition-colors duration-200 hover:cursor-pointer"
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
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              >
                Log Out
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {session && (
              <Link
              href="/profile"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <Image
                src="/user-placeholder.png"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full mr-3 object-cover"
              />
              </Link>
            )}
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
              <MobileNavLink href="/profile" variants={linkVariants} onClick={() => setIsOpen(false)}>
                Profile
              </MobileNavLink>
              <MobileNavLink href="/homes" variants={linkVariants} onClick={() => setIsOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/about" variants={linkVariants} onClick={() => setIsOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink href="/contact" variants={linkVariants} onClick={() => setIsOpen(false)}>
                Contact
              </MobileNavLink>
              <MobileNavLink href="/addHome" variants={linkVariants} onClick={() => setIsOpen(false)}>
                New Property
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
const MobileNavLink = ({ href, children, variants, onClick }) => {
  return (
    <motion.div variants={variants}>
      <Link
        href={href}
        onClick={onClick}
        className="flex py-2 px-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors duration-200 justify-center"
        style={{ color: "#000000" }}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default Navbar;
