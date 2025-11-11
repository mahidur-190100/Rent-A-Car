import React from 'react'
import { NavLink } from 'react-router-dom'

const All_VehicleCard = ({ model = {} }) => {
  const { vehicleName, coverImage, description, _id, category, pricePerDay } = model

  // Safe price display (formats number, falls back to raw text)
  const placeholderImg = 'https://placehold.co/600x400?text=Vehicle'

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 border border-gray-100 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={coverImage || placeholderImg}
          alt={vehicleName || 'Vehicle'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { e.currentTarget.src = placeholderImg }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category badge */}
        {category && (
          <span className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur">
            {category}
          </span>
        )}

        {/* Price pill */}
        {pricePerDay  && (
          <span className="absolute top-3 right-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 shadow">
            {pricePerDay }
            <span className="ml-1 text-[10px] text-gray-500">/day</span>
          </span>
        )}
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {vehicleName || 'Untitled Vehicle'}
        </h2>

        <p className="text-gray-600 line-clamp-2 min-h-[3rem] mb-4 leading-relaxed">
          {description || 'No description provided.'}
        </p>

        {/* Category + Price row (redundant with badges but useful on small screens) */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500">
            {category ? `Category: ${category}` : 'Category: —'}
          </span>
          <span className="text-sm font-semibold text-gray-800">
            {pricePerDay  ? `${pricePerDay }/day` : ''}
          </span>
        </div>

        {/* CTA */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500 font-medium">Available for Rent</span>
          <NavLink to={`/VehicleDetails/${_id}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
              View Details
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default All_VehicleCard