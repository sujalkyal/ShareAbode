"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Home, Users, Shield, Award, Heart, Globe } from "lucide-react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const Section = ({ children, className }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-[#854836] to-[#FFB22C] flex items-center justify-center">
        <motion.div
          className="text-center text-white p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About StayNest</h1>
          <p className="text-xl md:text-2xl">Discover our story and mission</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Our Story */}
        <Section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-4">
                Founded in 2020, StayNest began with a simple idea: to create a platform where travelers could find
                unique, comfortable homes that feel like their own, no matter where they are in the world.
              </p>
              <p className="text-lg mb-4">
                What started as a small team of travel enthusiasts has grown into a community of homeowners and
                travelers who share our passion for authentic, memorable experiences.
              </p>
              <p className="text-lg">
                Today, we connect thousands of travelers with their perfect accommodations, helping create memories that
                last a lifetime.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Our Mission */}
        <Section className="mb-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl mb-8">
              We believe that where you stay is as important as where you go. Our mission is to connect travelers with
              unique homes that enhance their journey and create unforgettable experiences.
            </p>
            <div className="p-8 bg-[#854836] text-white rounded-xl">
              <blockquote className="text-2xl italic">
                "We're not just booking accommodations; we're creating the backdrop for your most cherished memories."
              </blockquote>
              <p className="mt-4 font-medium">— Jane Doe, Founder</p>
            </div>
          </div>
        </Section>

        {/* Our Values */}
        <Section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <ValueCard
              icon={<Heart className="text-[#FFB22C]" size={32} />}
              title="Passion"
              description="We're passionate about travel and creating exceptional experiences for our users."
            />
            <ValueCard
              icon={<Shield className="text-[#FFB22C]" size={32} />}
              title="Trust"
              description="We build trust through transparency, reliability, and exceptional service."
            />
            <ValueCard
              icon={<Users className="text-[#FFB22C]" size={32} />}
              title="Community"
              description="We foster a community of hosts and travelers who share our values."
            />
            <ValueCard
              icon={<Home className="text-[#FFB22C]" size={32} />}
              title="Quality"
              description="We ensure every property meets our high standards for comfort and amenities."
            />
            <ValueCard
              icon={<Award className="text-[#FFB22C]" size={32} />}
              title="Excellence"
              description="We strive for excellence in every interaction and service we provide."
            />
            <ValueCard
              icon={<Globe className="text-[#FFB22C]" size={32} />}
              title="Sustainability"
              description="We promote responsible travel and sustainable practices in all we do."
            />
          </motion.div>
        </Section>

        {/* Our Team */}
        <Section>
          <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <TeamMember name="Jane Doe" role="Founder & CEO" image="/placeholder.svg?height=300&width=300" />
            <TeamMember
              name="John Smith"
              role="Chief Operations Officer"
              image="/placeholder.svg?height=300&width=300"
            />
            <TeamMember
              name="Emily Johnson"
              role="Head of Customer Experience"
              image="/placeholder.svg?height=300&width=300"
            />
            <TeamMember
              name="Michael Brown"
              role="Chief Technology Officer"
              image="/placeholder.svg?height=300&width=300"
            />
          </motion.div>
        </Section>
      </div>
    </div>
  )
}

const ValueCard = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
      variants={fadeIn}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

const TeamMember = ({ name, role, image }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden text-center hover:shadow-lg transition-shadow"
      variants={fadeIn}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-square overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-[#854836]">{role}</p>
      </div>
    </motion.div>
  )
}
