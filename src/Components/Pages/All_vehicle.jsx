import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import All_VehicleCard from '../Card/All_VehicleCard'

// Use your API base URL (env) and fall back to your Vercel API domain
const API_BASE = import.meta.env.VITE_API_URL || 'https://rent-a-car-server-livid.vercel.app'

const All_vehicle = () => {
  const raw = useLoaderData()
  // Ensure we always get an array from the loader result
  const initialList = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : []

  const [search, setSearch] = useState(initialList)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // If the loader data changes (revalidation), keep state in sync
  useEffect(() => {
    setSearch(initialList)
  }, [JSON.stringify(initialList)]) // stringify to compare contents safely

  const handleSearch = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const q = form.search.value.trim()

    if (!q) {
      setError(null)
      setSearch(initialList)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `${API_BASE}/search?search=${encodeURIComponent(q)}`,
        { headers: { Accept: 'application/json' } }
      )

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const ct = res.headers.get('content-type') || ''
      if (!ct.includes('application/json')) throw new Error('Response is not JSON')

      const body = await res.json()
      const list = Array.isArray(body) ? body : Array.isArray(body?.data) ? body.data : []
      setSearch(list)
    } catch (err) {
      setSearch([]) // keep it an array to avoid .map crash
      setError(err?.message || 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  // When the user clears the input, show all vehicles again
  const handleChange = (e) => {
    if (e.target.value.trim() === '') {
      setError(null)
      setSearch(initialList)
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
        <form onSubmit={handleSearch} className="w-full md:col-start-3 md:justify-self-end">
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
              onChange={handleChange}
            />
          </label>
        </form>
      </div>

      {/* Feedback */}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {loading && <div className="mb-4 text-gray-500">Searching...</div>}

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(search) && search.length > 0 ? (
          search.map((model) => <All_VehicleCard key={model._id} model={model} />)
        ) : (
          !loading && <div className="col-span-full text-center text-gray-500">No vehicles found.</div>
        )}
      </div>
    </div>
  )
}

export default All_vehicle