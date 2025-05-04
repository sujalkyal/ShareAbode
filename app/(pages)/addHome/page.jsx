"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Upload } from "lucide-react"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function AddHomePage() {
  const router = useRouter()
  const [states, setStates] = useState([{ id: 1, name: "California" }, { id: 2, name: "Texas" }])
  const [cities, setCities] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [form, setForm] = useState({
    title: "",
    description: "",
    stateId: "",
    cityId: "",
    availableFrom: "",
    availableTo: "",
    price: "",
    requirements: "",
    images: [],
  })

  useEffect(() => {
    if (selectedState) {
      // Mock fetching cities
      setTimeout(() => {
        setCities([
          { id: 1, name: "Los Angeles" },
          { id: 2, name: "San Francisco" },
        ])
      }, 500)
    }
  }, [selectedState])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setForm((prev) => ({ ...prev, images: files }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submit
    console.log(form)
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} className="text-3xl font-bold mb-6">
          List a New Home
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Title", name: "title", type: "text" },
            { label: "Description", name: "description", type: "textarea" },
            { label: "Requirements", name: "requirements", type: "textarea" },
            { label: "Price", name: "price", type: "number" },
          ].map(({ label, name, type }) => (
            <motion.div key={name} variants={fadeInUp} initial="hidden" animate="visible">
              <label className="block font-medium mb-1">{label}</label>
              {type === "textarea" ? (
                <textarea
                  className="w-full border px-4 py-2 rounded-lg"
                  value={form[name]}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                />
              ) : (
                <input
                  type={type}
                  className="w-full border px-4 py-2 rounded-lg"
                  value={form[name]}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                />
              )}
            </motion.div>
          ))}

          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <label className="block font-medium mb-1">State</label>
            <select
              className="w-full border px-4 py-2 rounded-lg"
              onChange={(e) => {
                setSelectedState(e.target.value)
                setForm({ ...form, stateId: e.target.value, cityId: "" })
              }}
              value={form.stateId}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>{state.name}</option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <label className="block font-medium mb-1">City</label>
            <select
              className="w-full border px-4 py-2 rounded-lg"
              onChange={(e) => setForm({ ...form, cityId: e.target.value })}
              value={form.cityId}
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Available From</label>
              <input
                type="date"
                className="w-full border px-4 py-2 rounded-lg"
                value={form.availableFrom}
                onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Available To</label>
              <input
                type="date"
                className="w-full border px-4 py-2 rounded-lg"
                value={form.availableTo}
                onChange={(e) => setForm({ ...form, availableTo: e.target.value })}
              />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <label className="block font-medium mb-1">Upload Images</label>
            <input type="file" multiple onChange={handleImageUpload} className="w-full" />
            <div className="flex flex-wrap mt-2 gap-2">
              {form.images.length > 0 &&
                Array.from(form.images).map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    className="w-24 h-24 object-cover rounded-md"
                    alt="preview"
                  />
                ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <button
              type="submit"
              className="bg-[#FFB22C] text-white px-6 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition"
            >
              Submit
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}
