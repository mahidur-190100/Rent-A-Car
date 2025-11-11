import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import All_VehicleCard from '../Card/All_VehicleCard'

const My_vehicles = () => {
  const { user } = useContext(AuthContext)
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && user.email) {
      fetch(`https://rent-a-car-server-livid.vercel.app/my-models?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          setModels(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching models:', error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-gray-500">
        Loading...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-gray-500">
        Please Wait.....
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        My Vehicles
      </h1>

      {models.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          No vehicles found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {models.map(model => (
            <All_VehicleCard key={model._id} model={model} />
          ))}
        </div>
      )}
    </div>
  )
}

export default My_vehicles