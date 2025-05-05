"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, ImagePlus, Trash2 } from "lucide-react";
import { useEdgeStore } from "../../lib/edgestore";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AddHomePage() {
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
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
  });
  const fileInputRef = useRef(null);
  const [loadingStates, setLoadingStates] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch("/api/states");
        const data = await res.json();
        setStates(data);
      } catch (error) {
        console.error("Failed to fetch states:", error);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedState) return;
      const res = await fetch("/api/city", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stateId: selectedState }),
      });
      const data = await res.json();
      setCities(data);
    };

    fetchCities();
  }, [selectedState]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = [];

    for (const file of files) {
      const res = await edgestore.publicFiles.upload({ file });
      uploadedImages.push(res.url);
    }

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedImages],
    }));
  };

  const handleRemoveImage = (url) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== url),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/homes/createHome", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        stateId: parseInt(form.stateId),
        cityId: parseInt(form.cityId),
        images: form.images,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      router.push("/homes");
    } else {
      const err = await res.json();
      console.error("Submission error:", err.error);
      alert("Failed to list the home. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F7F7] to-[#fff3e0] py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-4xl font-bold text-center text-[#000000] mb-10"
        >
          🏡 List a New Home
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Grouped Inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Title", name: "title", type: "text" },
              { label: "Price Per Night", name: "price", type: "number" },
            ].map(({ label, name, type }) => (
              <motion.div
                key={name}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <label className="block text-sm text-[#854836] font-semibold mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB22C]"
                  value={form[name]}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </motion.div>
            ))}
          </div>

          {/* Description & Requirements */}
          {["description", "requirements"].map((name) => (
            <motion.div
              key={name}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-sm text-[#854836] font-semibold mb-2 capitalize">
                {name}
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB22C]"
                value={form[name]}
                onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                placeholder={`Write ${name}...`}
              />
            </motion.div>
          ))}

          {/* State and City Dropdowns */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <label className="block text-sm text-[#854836] font-semibold mb-2">
                State
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB22C]"
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setForm({ ...form, stateId: e.target.value, cityId: "" });
                }}
                value={form.stateId}
                disabled={loadingStates}
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <label className="block text-sm text-[#854836] font-semibold mb-2">
                City
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB22C]"
                onChange={(e) => setForm({ ...form, cityId: e.target.value })}
                value={form.cityId}
                disabled={!selectedState}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>

          {/* Date Range */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <div>
              <label className="block text-sm text-[#854836] font-semibold mb-2">
                Available From
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB22C]"
                value={form.availableFrom}
                onChange={(e) =>
                  setForm({ ...form, availableFrom: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-[#854836] font-semibold mb-2">
                Available To
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB22C]"
                value={form.availableTo}
                onChange={(e) =>
                  setForm({ ...form, availableTo: e.target.value })
                }
              />
            </div>
          </motion.div>

          {/* Image Upload */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <label className="text-sm text-[#854836] font-semibold mb-2 flex items-center gap-2">
              <ImagePlus size={18} /> Upload Images
            </label>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Custom button to trigger file input */}
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="inline-block px-4 py-2 bg-[#FFB22C] text-white text-sm font-semibold rounded-lg shadow hover:bg-[#e89f1f] transition hover:cursor-pointer"
            >
              Select Images
            </button>

            {/* Preview grid */}
            <div className="flex flex-wrap mt-4 gap-4">
              {form.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 rounded-xl overflow-hidden shadow-md"
                >
                  <img
                    src={img}
                    alt="preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img)}
                    className="absolute top-1 right-1 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100 transition"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <button
              type="submit"
              className="bg-[#FFB22C] hover:bg-[#e6a419] text-black px-8 py-3 rounded-xl font-semibold shadow-lg transition duration-300 hover:cursor-pointer"
            >
              Submit Listing
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
