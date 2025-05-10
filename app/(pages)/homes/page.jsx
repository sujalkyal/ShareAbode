"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { Search, MapPin, Calendar, ArrowUpDown } from "lucide-react";

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

export default function HomePage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [homes, setHomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const propertiesRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch states
        const stateRes = await axios.get("/api/states");
        setStates(stateRes.data);

        // Fetch homes
        const homeRes = await axios.get("/api/homes/getAllHomes");
        const homes = homeRes.data;

        setHomes(homes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        try {
          const res = await axios.post("/api/city", {
            stateId: selectedState,
          });
          setCities(res.data);
          setSelectedCity("");
        } catch (error) {
          console.error("Failed to fetch cities:", error);
          setCities([]);
        }
      } else {
        setCities([]);
      }
    };

    fetchCities();
  }, [selectedState]);

  // Filter and sort homes
  const filteredHomes = homes
    .filter((home) => {
      console.log(homes);
      console.log(
        "Home stateId:",
        home.state.id,
        "Selected stateId:",
        selectedState
      );
      if (selectedState && home.state.id !== Number(selectedState))
        return false;
      if (selectedCity && home.city.id !== Number(selectedCity)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "date") {
        return new Date(a.availableFrom) - new Date(b.availableFrom);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-[#854836] to-[#FFB22C] flex items-center justify-center">
        <motion.div
          className="text-center text-white p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Find Your Dream Stay
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover the perfect property for your next adventure
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button
              className="bg-[#FFB22C] text-black px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-opacity-90 transition-all hover:cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                propertiesRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Search className="mr-2" size={20} />
              Browse Properties
            </motion.button>
            <motion.button
              className="bg-white text-[#854836] px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-opacity-90 transition-all hover:cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="mr-2" size={20} />
              View Availability
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            Find Your Perfect Home
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB22C] hover:cursor-pointer"
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB22C] disabled:bg-gray-100 hover:cursor-pointer"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB22C] hover:cursor-pointer"
              >
                <option value="price">Price (Low to High)</option>
                <option value="date">Availability Date</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div ref={propertiesRef}>
              <h2 className="text-2xl font-semibold">Available Properties</h2>
            </div>
            <div className="flex items-center">
              <ArrowUpDown size={16} className="mr-2" />
              <span>{filteredHomes.length} homes found</span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredHomes.map((home) => (
                <motion.div
                  key={home.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/homes/${home.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={home.images[0] || "/image-placeholder.png"}
                        alt={home.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
                          {home.city.name}, {home.state.name}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {home.description}
                      </p>
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
                </motion.div>
              ))}
            </motion.div>
          )}

          {filteredHomes.length === 0 && !isLoading && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-gray-600">
                Try adjusting your filters to find more options
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
