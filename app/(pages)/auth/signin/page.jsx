"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col md:flex-row">
      {/* Left Side - Illustration */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#854836]">
        <Image
          src="/no_bg_house.png" // Replace with your illustration path
          alt="Sign In Illustration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col w-full md:w-1/2 px-8 py-12 md:py-20 justify-center">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold text-[#000000] mb-8">Welcome Back</h1>

          {/* Brand Logo/Name */}
          <div className="mb-8">
            <span className="text-xl font-semibold text-[#854836]">StayNest</span>
          </div>

          {/* Animated Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#000000]">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 text-black block w-full px-4 py-2 border border-[#854836] rounded-lg shadow-sm focus:ring-[#FFB22C] focus:border-[#FFB22C]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#000000]">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 text-black block w-full px-4 py-2 border border-[#854836] rounded-lg shadow-sm focus:ring-[#FFB22C] focus:border-[#FFB22C]"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FFB22C] border-gray-300 rounded hover:cursor-pointer" />
                <span className="ml-2 text-sm text-[#000000]">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#854836] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#FFB22C] text-[#000000] font-semibold rounded-lg shadow-md hover:bg-[#e6a524] transition-colors hover:cursor-pointer"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-[#000000]">
              Don't have an account?{' '}
              <a href="/signup" className="text-[#854836] font-medium hover:underline hover:cursor-pointer">
                Sign up
              </a>
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
