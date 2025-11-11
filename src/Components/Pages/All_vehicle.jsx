import React from 'react'
import { useLoaderData } from 'react-router-dom' // <- use react-router-dom
import All_VehicleCard from '../Card/All_VehicleCard'

const All_vehicle = () => {
  const data = useLoaderData() || []

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">All Vehicles</h1>

      {/* 1 per row on mobile, 2 on small/medium, 3 on large+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(model => (
          <All_VehicleCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  )
}

export default All_vehicle