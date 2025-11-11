import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import All_VehicleCard from '../Card/All_VehicleCard'

const All_vehicle = () => {
  const data = useLoaderData() || []
  const [search, setSearch] = useState(data)

  const handleSearch = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const q = form.search.value.trim()
    if (!q) {
      setSearch(data) // reset to all vehicles if empty
      return
    }

    try {
      const res = await fetch(`http://localhost:3000/search?search=${encodeURIComponent(q)}`)
      const results = await res.json()
      setSearch(Array.isArray(results) ? results : [])
    } catch {
      setSearch([])
    }
  }

  // When the user clears the input, show all vehicles again
  const handleChange = (e) => {
    if (e.target.value.trim() === '') {
      setSearch(data)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header: responsive title + search */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center md:col-start-2">
          All Vehicles
        </h1>

        {/* searchbar */}
        <form onSubmit={handleSearch}>
          <div className="w-full md:col-start-3 md:justify-self-end">
            <label className="input input-bordered rounded-full flex items-center gap-2 w-full max-w-full sm:max-w-md md:max-w-xs">
              <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                id="search"
                name="search"
                type="search"
                required
                placeholder="Search"
                className="grow bg-transparent outline-none"
                onChange={handleChange} // reset when cleared
              />
            </label>
          </div>
        </form>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {search.map((model) => (
          <All_VehicleCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  )
}

export default All_vehicle