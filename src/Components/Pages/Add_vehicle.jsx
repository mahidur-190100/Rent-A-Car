import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { toast } from 'react-toastify'

const Add_vehicle = () => {
  const { user } = useContext(AuthContext) || {}
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target

    const totalVar = {
      vehicleName: form.vehicleName.value.trim(),
      owner: form.owner.value.trim(),
      category: form.category.value,
      pricePerDay: Number(form.pricePerDay.value),
      location: form.location.value.trim(),
      userEmail: form.userEmail.value.trim(),
      description: form.description.value.trim(),
      coverImage: form.coverImage.value.trim(),
      createdAt: new Date().toISOString(),
    }

    try {
      // FIX: correct API URL (remove the extra https://)
      const res = await fetch('https://rent-a-car-server-livid.vercel.app/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(totalVar),
      })
      if (!res.ok) throw new Error('Failed to add vehicle')
      await res.json()

      toast.success('Vehicle added successfully')
      // FIX: use absolute path to match your router (/All-vehicle)
      navigate('/All-vehicle', { replace: true })
      // Alternatively (relative): navigate('../All-vehicle', { replace: true })
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
    }
  }

  return (
    <section className="min-h-screen  py-20 lg:py-28">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        <div className="card bg-white border border-gray-200 shadow-xl rounded-2xl">
          <div className="card-body p-6 sm:p-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 bg-clip-text text-transparent">
              Add New Vehicle
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Fill in the details to list your vehicle for rent
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vehicle Name */}
              <div>
                <label className="label font-medium text-slate-700">Vehicle Name</label>
                <input
                  type="text"
                  name="vehicleName"
                  required
                  placeholder="Toyota Corolla"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* Owner Name */}
              <div>
                <label className="label font-medium text-slate-700">Owner Name</label>
                <input
                  type="text"
                  name="owner"
                  required
                  placeholder="John Doe"
                  defaultValue={user?.displayName || ''}
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* Category */}
              <div>
                <label className="label font-medium text-slate-700">Category</label>
                <select
                  name="category"
                  required
                  defaultValue=""
                  className="select select-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  <option value="" disabled>Select category</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Van">Van</option>
                  <option value="Truck">Truck</option>
                  <option value="Bike">Bike</option>
                  <option value="EV">EV</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Price Per Day */}
              <div>
                <label className="label font-medium text-slate-700">Price Per Day</label>
                <input
                  type="number"
                  name="pricePerDay"
                  required
                  min="0"
                  step="1"
                  placeholder="70"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* Location */}
              <div>
                <label className="label font-medium text-slate-700">Location</label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Dhaka, Bangladesh"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="label font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  name="userEmail"
                  required
                  placeholder="john.doe@example.com"
                  defaultValue={user?.email || ''}
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* Cover Image URL */}
              <div className="md:col-span-2">
                <label className="label font-medium text-slate-700">Cover Image URL</label>
                <input
                  type="url"
                  name="coverImage"
                  required
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="label font-medium text-slate-700">Description</label>
                <textarea
                  name="description"
                  required
                  rows="5"
                  placeholder="Make a happy journey."
                  className="textarea textarea-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="btn w-full text-white rounded-xl border-0 bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 hover:from-gray-900 hover:to-zinc-900"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Add_vehicle