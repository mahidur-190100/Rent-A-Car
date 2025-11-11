import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import All_VehicleCard from '../Card/All_VehicleCard'


const My_vehicles = () => {
  const { user } = useContext(AuthContext) // Fixed: use useContext properly
  // console.log('My_vehicles user:', user)
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (user && user.email) {
      fetch(`http://localhost:3000/my-models?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
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
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please Wait.....</div>
  }

  return (
    <div>
      My_vehicles
      {models.length === 0 ? (
        <div>No vehicles found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            models.map(model => <All_VehicleCard key={model._id} model={model} />)

          }

        </div>


      )}
    </div>
  )
}

export default My_vehicles