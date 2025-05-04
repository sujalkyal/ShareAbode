"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, MapPin, CheckCircle } from "lucide-react"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function BookingPage() {
  const params = useParams()
  const [home, setHome] = useState(null)
  const [loading, setLoading] = useState(true)
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
  })

  useEffect(() => {
    setTimeout(() => {
      setHome({
        id: params.id,
        title: "Modern Loft in NYC",
        price: 180,
        cityName: "New York",
        stateName: "New York",
        description: "A trendy and centrally located loft with beautiful skyline views.",
        image: "/placeholder.svg?height=600&width=800",
        availableFrom: "2024-06-01",
        availableTo: "2024-08-30",
      })
      setLoading(false)
    }, 1000)
  }, [params.id])

  const handleConfirm = () => {
    setConfirming(true)
    setTimeout(() => {
      setConfirming(false)
      setConfirmed(true)
    }, 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-[#854836] rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-8">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <h1 className="text-3xl font-bold mb-2">Booking Confirmation</h1>
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-col md:flex-row gap-6">
          <img src={home.image} className="w-full md:w-1/2 h-64 object-cover rounded-lg" />
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold">{home.title}</h2>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="mr-1 text-[#854836]" size={18} />
                {home.cityName}, {home.stateName}
              </div>
              <p className="mt-3 text-gray-700">{home.description}</p>
            </div>
            <div className="mt-4 text-lg font-semibold text-[#854836]">${home.price} / night</div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-4">
          <h3 className="text-2xl font-semibold">Guest Information</h3>
          <input
            className="w-full border rounded-lg px-4 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full Name"
          />
          <input
            className="w-full border rounded-lg px-4 py-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
          />
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="text-center">
          <button
            onClick={handleConfirm}
            disabled={confirming || confirmed}
            className="bg-[#FFB22C] text-white px-6 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition"
          >
            {confirming ? "Confirming..." : confirmed ? "Confirmed!" : "Confirm Booking"}
          </button>

          {confirmed && (
            <motion.div
              className="mt-6 flex flex-col items-center text-green-600 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CheckCircle className="w-10 h-10 mb-2" />
              Booking successful! A confirmation has been sent to your email.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
