"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Plus,
  HomeIcon,
  Clock,
  ChevronRight,
} from "lucide-react";
import axios from "axios";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userHomes, setUserHomes] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user");
        const userData = response.data;

        setUser(userData);
        setUserHomes(
          userData.homes.map((home) => ({
            ...home,
            cityName: home.city.name,
            stateName: home.state.name,
            imageUrl: home.images[0] || "/login_image.jpeg",
          }))
        );
        setUserBookings(
          userData.bookings.map((booking) => ({
            ...booking,
            homeTitle: booking.home.title,
            homeImage: booking.home.images[0] || "/login_image.jpeg",
            cityName: booking.home.city.name,
            stateName: booking.home.state.name,
            startDate: booking.home.availableFrom,
            endDate: booking.home.availableTo,
            totalPrice: booking.home.price,
          }))
        );
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user profile");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#854836]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Hero Section */}
      <div className="relative h-[20vh] bg-gradient-to-r from-[#854836] to-[#FFB22C] flex items-center justify-center">
        <motion.div
          className="text-center text-white p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold">My Profile</h1>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* User Info Section */}
        <motion.section
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl font-bold mb-6"
            variants={itemVariants}
          >
            Account Information
          </motion.h2>

          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            variants={itemVariants}
          >
            <div className="md:flex">
              <div className="md:w-1/3 bg-[#854836] text-white p-6 flex flex-col items-center justify-center">
                {user && (
                  <>
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white">
                      <img
                        src={user.avatar || "/user-placeholder.png"}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold">{user.name}</h3>
                    <p className="text-[#FFB22C]">
                      Member since{" "}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>

              <div className="md:w-2/3 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Member Since</p>
                    <p className="font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Account ID</p>
                    <p className="font-medium">{user.id}</p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button className="px-4 py-2 bg-[#FFB22C] text-black rounded-lg font-medium hover:bg-opacity-90 transition-colors hover:cursor-pointer">
                    Edit Profile
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors hover:cursor-pointer">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* My Properties Section */}
        <motion.section
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="flex justify-between items-center mb-6"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold">My Properties</h2>
            <Link
              href="/addHome"
              className="flex items-center bg-[#FFB22C] text-black px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              <Plus size={18} className="mr-2" />
              List New Home
            </Link>
          </motion.div>

          {userHomes.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {userHomes.map((home) => (
                <motion.div
                  key={home.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/homes/${home.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={home.images[0] || "/login_image.jpeg"}
                        alt={home.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 bg-[#FFB22C] text-black px-3 py-1 font-medium">
                        ₹{home.price}/night
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {home.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin size={16} className="mr-1 text-[#854836]" />
                        <span>
                          {home.cityName}, {home.stateName}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span>
                          Available:{" "}
                          {new Date(home.availableFrom).toLocaleDateString()} -{" "}
                          {new Date(home.availableTo).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="border-t border-gray-100 p-4 flex justify-between">
                    <button className="text-[#854836] hover:underline hover:cursor-pointer">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline hover:cursor-pointer">
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="bg-white rounded-xl shadow-md p-8 text-center"
              variants={itemVariants}
            >
              <HomeIcon size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Properties Listed</h3>
              <p className="text-gray-600 mb-6">
                You haven't listed any properties yet. Start sharing your space
                and earning income today.
              </p>
              <Link
                href="/addHome"
                className="inline-flex items-center bg-[#FFB22C] text-black px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                <Plus size={18} className="mr-2" />
                List Your First Property
              </Link>
            </motion.div>
          )}
        </motion.section>

        {/* My Bookings Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl font-bold mb-6"
            variants={itemVariants}
          >
            My Bookings
          </motion.h2>

          {userBookings.length > 0 ? (
            <motion.div className="space-y-4" variants={containerVariants}>
              {userBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  variants={itemVariants}
                >
                  <div className="md:flex">
                    <div className="md:w-1/4">
                      <div className="h-full">
                        <img
                          src={booking.home.images[0] || "/login_image.jpeg"}
                          alt={booking.home.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="p-6 md:w-3/4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {booking.home.title}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-3">
                            <MapPin size={16} className="mr-1 text-[#854836]" />
                            <span>
                              {booking.home.city.name},{" "}
                              {booking.home.state.name}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            ₹
                            {(
                              booking.home.price *
                              ((new Date(booking.home.availableTo) -
                                new Date(booking.home.availableFrom)) /
                                86400000)
                            ).toFixed(2)}
                          </div>

                          <div className="text-sm text-gray-500">Total</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1 text-[#854836]" />
                          <span>
                            Check-in:{" "}
                            {new Date(
                              booking.home.availableFrom
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1 text-[#854836]" />
                          <span>
                            Check-out:{" "}
                            {new Date(
                              booking.home.availableTo
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={14} className="mr-1" />
                          <span>
                            Booked on {new Date().toLocaleDateString()}
                          </span>
                        </div>
                        <button className="flex items-center text-[#854836] hover:underline hover:cursor-pointer">
                          View Details
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="bg-white rounded-xl shadow-md p-8 text-center"
              variants={itemVariants}
            >
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Bookings Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't made any bookings yet. Start exploring properties
                and plan your next stay!
              </p>
              <Link
                href="/"
                className="inline-flex items-center bg-[#FFB22C] text-black px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                Browse Properties
              </Link>
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
