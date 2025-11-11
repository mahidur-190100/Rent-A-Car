import React from 'react'
import { useLoaderData, Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const VehicleDetails = () => {
  const data = useLoaderData()
  const model = data?.result ?? data
  const navigate = useNavigate()

  const {
    vehicleName,
    coverImage,
    description,
    category,
    pricePerDay,
    location,
    owner,
    userEmail,
    createdAt,
    _id,
  } = model || {}

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (!result.isConfirmed) return

      try {
        const res = await fetch(`https://https://rent-a-car-server-livid.vercel.app/models/${_id}`, {
          method: 'DELETE',
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!data.success) throw new Error('Delete failed')

        await Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        })

        navigate('/All-vehicle')
      } catch (error) {

        console.error('Error:', error)
        // Swal.fire('Error', 'Failed to delete. Please try again.', 'error')
      }
    })
  }

  const placeholderImg = 'https://placehold.co/800x600?text=Vehicle'

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-white shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Image */}
          <div className="w-full">
            <div className="relative w-full h-64 sm:h-80 lg:h-[420px] overflow-hidden rounded-xl shadow-md">
              <img
                src={coverImage || placeholderImg}
                alt={vehicleName || 'Vehicle'}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = placeholderImg }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                {category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur">
                    {category}
                  </span>
                )}
              </div>
              {pricePerDay !== undefined && pricePerDay !== null && pricePerDay !== '' && (
                <span className="absolute top-3 right-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 shadow">
                  {pricePerDay}<span className="ml-1 text-[10px] text-gray-500">/day</span>
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {vehicleName}
            </h1>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-6">
              {description}
            </p>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {owner && (
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Owner</p>
                  <p className="text-gray-800 font-medium">{owner}</p>
                </div>
              )}
              {location && (
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Location</p>
                  <p className="text-gray-800 font-medium">{location}</p>
                </div>
              )}
              {category && (
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Category</p>
                  <p className="text-gray-800 font-medium">{category}</p>
                </div>
              )}
              {pricePerDay !== undefined && pricePerDay !== null && pricePerDay !== '' && (
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Price Per Day</p>
                  <p className="text-gray-800 font-medium">{pricePerDay} / day</p>
                </div>
              )}
              {userEmail && (
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Contact Email</p>
                  <p className="text-gray-800 font-medium break-all">{userEmail}</p>
                </div>
              )}
              {createdAt && (
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Listed On</p>
                  <p className="text-gray-800 font-medium">
                    {new Date(createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/UpdateModel/${_id}`}
                className="btn w-full sm:w-auto border-0 text-white rounded-full bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 hover:from-gray-900 hover:to-zinc-900"
              >
                Update
              </Link>

              <button
                className="btn w-full sm:w-auto border-0 text-white rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                Book
              </button>

              <button
                onClick={handleDelete}
                className="btn w-full sm:w-auto rounded-full border border-red-300 text-red-600 hover:border-red-500 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleDetails