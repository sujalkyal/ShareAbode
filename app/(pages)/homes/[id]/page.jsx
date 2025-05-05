"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Star,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share,
} from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [home, setHome] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await axios.get(`/api/homes/${params.id}`);
        const data = res.data;

        // Transform if needed
        setHome({
          ...data,
          cityName: data.city?.name || "",
          stateName: data.state?.name || "",
          host: {
            id: data.user.id,
            name: data.user.name,
            avatar: "/user-placeholder.png",
            joinedDate: data.user.createdAt,
            responseRate: 98,
          },
          rating: 4.9,
          reviews: 124,
          bedrooms: 4,
          bathrooms: 3,
          maxGuests: 8,
          amenities: [
            "Pool",
            "Beach Access",
            "WiFi",
            "Air Conditioning",
            "Kitchen",
            "Free Parking",
            "Washer & Dryer",
            "TV",
            "Workspace",
            "Patio",
          ],
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch home:", error);
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchHome();
    }
  }, [params.id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % home.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + home.images.length) % home.images.length
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#854836]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Image Gallery */}
      <div className="relative h-[60vh] bg-gray-200">
        <img
          src={home.images[currentImageIndex] || "/placeholder.svg"}
          alt={home.title}
          className="w-full h-full object-cover"
        />

        {/* Navigation arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors hover:cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors hover:cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {home.images.length}
        </div>

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors hover:cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={toggleFavorite}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors hover:cursor-pointer"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              size={24}
              className={isFavorite ? "fill-red-500 text-red-500" : ""}
            />
          </button>
          <button
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors hover:cursor-pointer"
            aria-label="Share"
          >
            <Share size={24} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Title and Location */}
            <motion.div variants={fadeIn} className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{home.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-1 text-[#854836]" />
                <span>
                  {home.cityName}, {home.stateName}
                </span>
                <div className="mx-2">•</div>
                <div className="flex items-center">
                  <Star size={18} className="mr-1 text-[#FFB22C]" />
                  <span>
                    {home.rating} ({home.reviews} reviews)
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Key Features */}
            <motion.div
              variants={fadeIn}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-xl font-bold">{home.bedrooms}</div>
                <div className="text-gray-600">Bedrooms</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-xl font-bold">{home.bathrooms}</div>
                <div className="text-gray-600">Bathrooms</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-xl font-bold">{home.maxGuests}</div>
                <div className="text-gray-600">Guests</div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={fadeIn} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed">
                {home.description}
              </p>
            </motion.div>

            {/* Amenities */}
            <motion.div variants={fadeIn} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {home.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFB22C] rounded-full mr-2"></div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div variants={fadeIn} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Availability</h2>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <Calendar size={18} className="mr-2 text-[#854836]" />
                  <span className="font-medium">Available dates:</span>
                </div>
                <p>
                  {new Date(home.availableFrom).toLocaleDateString()} -{" "}
                  {new Date(home.availableTo).toLocaleDateString()}
                </p>
              </div>
            </motion.div>

            {/* Host Info */}
            <motion.div variants={fadeIn} className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Hosted by</h2>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                <img
                  src={home.host.avatar}
                  alt={home.host.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-medium">{home.host.name}</h3>
                  <p className="text-sm text-gray-600">
                    Joined:{" "}
                    {new Date(home.host.joinedDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Response Rate: {home.host.responseRate}%
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Booking Sidebar */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md sticky top-24"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-xl font-semibold text-[#854836]">
                  ₹{home.price}
                </p>
                <p className="text-sm text-gray-500">per night</p>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star size={16} className="text-[#FFB22C] mr-1" />
                {home.rating}
              </div>
            </div>
            <button
              onClick={() => router.push(`/homes/${home.id}/checkout`)}
              className="w-full bg-[#FFB22C] text-black font-semibold py-3 px-4 rounded-xl hover:bg-[#eaa122] transition-colors text-center mt-4 hover:cursor-pointer"
            >
              Book Now
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
