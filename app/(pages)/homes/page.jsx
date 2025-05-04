"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Search, MapPin, Calendar, ArrowUpDown } from "lucide-react"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function HomePage() {
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [sortBy, setSortBy] = useState("price")
  const [homes, setHomes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch states (mock data for now)
  useEffect(() => {
    // This would be an API call in a real application
    const mockStates = [
      { id: "1", name: "California" },
      { id: "2", name: "New York" },
      { id: "3", name: "Florida" },
      { id: "4", name: "Texas" },
    ]
    setStates(mockStates)

    // Mock homes data
    const mockHomes = [
      {
        id: "1",
        title: "Beachfront Villa",
        description: "Beautiful villa with ocean views",
        price: 250,
        stateId: "3",
        cityId: "5",
        stateName: "Florida",
        cityName: "Miami",
        availableFrom: "2023-06-01",
        availableTo: "2023-08-31",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "2",
        title: "Mountain Cabin",
        description: "Cozy cabin in the mountains",
        price: 150,
        stateId: "1",
        cityId: "1",
        stateName: "California",
        cityName: "Lake Tahoe",
        availableFrom: "2023-07-01",
        availableTo: "2023-09-30",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "3",
        title: "Downtown Loft",
        description: "Modern loft in the heart of the city",
        price: 200,
        stateId: "2",
        cityId: "3",
        stateName: "New York",
        cityName: "New York City",
        availableFrom: "2023-05-15",
        availableTo: "2023-07-15",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "4",
        title: "Desert Retreat",
        description: "Peaceful retreat in the desert",
        price: 180,
        stateId: "4",
        cityId: "7",
        stateName: "Texas",
        cityName: "Austin",
        availableFrom: "2023-06-15",
        availableTo: "2023-08-15",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "5",
        title: "Lakeside Cottage",
        description: "Charming cottage by the lake",
        price: 170,
        stateId: "1",
        cityId: "2",
        stateName: "California",
        cityName: "San Francisco",
        availableFrom: "2023-07-15",
        availableTo: "2023-09-15",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "6",
        title: "Urban Apartment",
        description: "Stylish apartment in the city",
        price: 190,
        stateId: "2",
        cityId: "3",
        stateName: "New York",
        cityName: "New York City",
        availableFrom: "2023-06-01",
        availableTo: "2023-08-01",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ]

    setHomes(mockHomes)
    setIsLoading(false)
  }, [])

  // Update cities when state changes
  useEffect(() => {
    if (selectedState) {
      // This would be an API call in a real application
      const mockCitiesByState = {
        1: [
          { id: "1", name: "Lake Tahoe" },
          { id: "2", name: "San Francisco" },
        ],
        2: [
          { id: "3", name: "New York City" },
          { id: "4", name: "Buffalo" },
        ],
        3: [
          { id: "5", name: "Miami" },
          { id: "6", name: "Orlando" },
        ],
        4: [
          { id: "7", name: "Austin" },
          { id: "8", name: "Dallas" },
        ],
      }

      setCities(mockCitiesByState[selectedState] || [])
      setSelectedCity("")
    } else {
      setCities([])
    }
  }, [selectedState])

  // Filter and sort homes
  const filteredHomes = homes
    .filter((home) => {
      if (selectedState && home.stateId !== selectedState) return false
      if (selectedCity && home.cityId !== selectedCity) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price
      } else if (sortBy === "date") {
        return new Date(a.availableFrom) - new Date(b.availableFrom)
      }
      return 0
    })

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Find Your Dream Stay</h1>
          <p className="text-xl md:text-2xl mb-8">Discover the perfect property for your next adventure</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button
              className="bg-[#FFB22C] text-black px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-opacity-90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="mr-2" size={20} />
              Browse Properties
            </motion.button>
            <motion.button
              className="bg-white text-[#854836] px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-opacity-90 transition-all"
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
          <h2 className="text-2xl font-semibold mb-4">Find Your Perfect Home</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB22C]"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB22C] disabled:bg-gray-100"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB22C]"
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
            <h2 className="text-2xl font-semibold">Available Properties</h2>
            <div className="flex items-center">
              <ArrowUpDown size={16} className="mr-2" />
              <span>{filteredHomes.length} homes found</span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
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
                        src={home.imageUrl || "/placeholder.svg"}
                        alt={home.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 bg-[#FFB22C] text-black px-3 py-1 font-medium">
                        ${home.price}/night
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{home.title}</h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin size={16} className="mr-1 text-[#854836]" />
                        <span>
                          {home.cityName}, {home.stateName}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{home.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span>
                          Available: {new Date(home.availableFrom).toLocaleDateString()} -{" "}
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
              <p className="text-gray-600">Try adjusting your filters to find more options</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
