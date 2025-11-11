import React, { useEffect, useState } from 'react'
import { NavLink, useLoaderData } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import All_VehicleCard from '../Card/All_VehicleCard';

const heroImages = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
  'https://th.bing.com/th/id/R.8cf28b55f94fa687b060dcac6b5d2db9?rik=4kWtvr9MH46O5w&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fQHxLQ1r.jpg&ehk=rq3XK%2boByQkhPDm2vGn7KPkGZw7MmCFuQGzy9IYsLI8%3d&risl=&pid=ImgRaw&r=0',
  'https://th.bing.com/th/id/OIP.IvMSwmh0gUGexdlEk3fPowHaEK?o=7&cb=ucfimg2rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
]

// Simple auto-play slider using Framer Motion
function HeroImageSlider({ images = heroImages, interval = 3500 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || images.length < 2) return
    const id = setInterval(() => setIndex(i => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [paused, images.length, interval])

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setIndex(i => (i + 1) % images.length)

  return (
    <div
      className="relative w-full max-w-sm lg:max-w-md h-64 lg:h-80 rounded-lg overflow-hidden shadow-2xl mb-8 lg:mb-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="TravelEase hero vehicle"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="btn btn-circle btn-sm absolute left-2 top-1/2 -translate-y-1/2"
            aria-label="Previous image"
          >
            ❮
          </button>
          <button
            onClick={next}
            className="btn btn-circle btn-sm absolute right-2 top-1/2 -translate-y-1/2"
            aria-label="Next image"
          >
            ❯
          </button>

          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const HomePage = () => {
  const data = useLoaderData();

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <div className="hero bg-base-200 mt-20 py-12 lg:py-20">
        <div className="hero-content flex-col lg:flex-row-reverse max-w-6xl mx-auto">
          {/* Replace <img /> with slider */}
          <HeroImageSlider images={heroImages} />

          <div className="text-center lg:text-left lg:mr-12">
            <p className='mb-5 text-lg text-gray-600'>Welcome to</p>
            <h1 className="momo-trust text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6">
              TravelEase
            </h1>
            <p className="py-6 text-base lg:text-lg text-gray-700 max-w-2xl">
              Go anywhere with Travel Ease.
              Fast, flexible car rentals—transparent pricing, book in minutes.
              Want to see more cars?
            </p>
            <NavLink to={"All-vehicle"}>
              <button className="btn btn-primary btn-lg px-8">All Vehicles</button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Latest Models Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Latest Models
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our newest additions to the TravelEase fleet
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.map((model, idx) => (
            <motion.div
              key={model._id}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: Math.min(idx * 0.06, 0.3),
              }}
            >
              <All_VehicleCard model={model} />
            </motion.div>
          ))}
        </div>

        {/* View More Button for Mobile */}
        {data.length > 3 && (
          <div className="text-center mt-8 lg:hidden">
            <NavLink to={"All-vehicle"}>
              <button className="btn btn-outline btn-primary">
                View All Vehicles
              </button>
            </NavLink>
          </div>
        )}
      </div>

    </div>
  )
}

export default HomePage