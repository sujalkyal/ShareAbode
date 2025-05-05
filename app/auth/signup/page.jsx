"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const response = await axios.post('/api/auth/signup', {
            name,
            email,
            password,
          });

        if (response.status === 409) {
            setError('User already exists');
            return;
        }
        if (response.status === 400) {
            setError('Email and password are required');
            return;
        }

      router.push('/auth/signin');
    } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col md:flex-row">
      {/* Left Side - Illustration */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#854836]">
        <Image
          src="/no_bg_house.png"
          alt="Sign Up Illustration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col w-full md:w-1/2 px-8 py-12 md:py-20 justify-center">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold text-[#000000] mb-8">Create an Account</h1>

          {/* Brand Logo/Name */}
          <div className="mb-8">
            <span className="text-xl font-semibold text-[#854836]">ShareAbode</span>
          </div>

          {/* Animated Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#000000]">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 text-black block w-full px-4 py-2 border border-[#854836] rounded-lg shadow-sm focus:ring-[#FFB22C] focus:border-[#FFB22C]"
              />
            </div>

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

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#FFB22C] text-[#000000] font-semibold rounded-lg shadow-md hover:bg-[#e6a524] transition-colors hover:cursor-pointer"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-[#000000]">
              Already have an account?{' '}
              <a href="/auth/signin" className="text-[#854836] font-medium hover:underline hover:cursor-pointer">
                Sign in
              </a>
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
