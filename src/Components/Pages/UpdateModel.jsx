import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

const UpdateModel = () => {
  const data = useLoaderData()
  const model = data.result
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget

    const totalVar = {
      vehicleName: form.vehicleName.value,
      category: form.category.value,
      description: form.description.value,
      coverImage: form.coverImage.value,
    }

    try {
      const res = await fetch(`https://https://rent-a-car-server-livid.vercel.app/models/${model._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(totalVar),
      })
      if (!res.ok) throw new Error('Failed to update')
      // optional: await res.json()
      navigate('/All-vehicle', { replace: true })
    } catch (err) {
        console.error('Error:', err)
            
      // handle error UI here if you want (toast/alert)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        <div className="card bg-white border border-gray-200 shadow-xl rounded-2xl">
          <div className="card-body p-6 sm:p-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 bg-clip-text text-transparent">
              Update Vehicle
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Edit the details and save your changes
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vehicle Name */}
              <div>
                <label className="label font-medium text-slate-700">Vehicle Name</label>
                <input
                  type="text"
                  name="vehicleName"
                  defaultValue={model.vehicleName}
                  required
                  placeholder="Enter vehicle name"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* Category */}
              <div>
                <label className="label font-medium text-slate-700">Category</label>
                <select
                  name="category"
                  required
                  defaultValue={model.category}
                  className="select select-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  <option value="" disabled>Select category</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Plants">Plants</option>
                  <option value="Foods">Foods</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Characters">Characters</option>
                  <option value="Space">Space</option>
                  <option value="Animals">Animals</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Cover Image URL (full width) */}
              <div className="md:col-span-2">
                <label className="label font-medium text-slate-700">Cover Image URL</label>
                <input
                  type="url"
                  name="coverImage"
                  defaultValue={model.coverImage}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* Description (full width) */}
              <div className="md:col-span-2">
                <label className="label font-medium text-slate-700">Description</label>
                <textarea
                  name="description"
                  defaultValue={model.description}
                  required
                  rows="5"
                  placeholder="Enter description"
                  className="textarea textarea-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="btn w-full text-white rounded-xl border-0 bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 hover:from-gray-900 hover:to-zinc-900"
                >
                  Update Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpdateModel