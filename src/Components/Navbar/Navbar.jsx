import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { auth } from '../Firebase/Firebase.config'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'

const Navbar = () => {
  // Theme toggle
  const handleTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light')
  }
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  useEffect(() => {

     const html = document.documentElement // same as querySelector('html')
     html.setAttribute('data-theme', theme)
     localStorage.setItem('theme', theme)
  },[theme])

  // Auth
  const { user, loading, logout, setUser } = useContext(AuthContext) || {}
  // console.log('Navbar user:', user)

  const handleSignOut = async () => {
    try {
      if (typeof logout === 'function') {
        await logout()
      } else {
        await signOut(auth)
        if (typeof setUser === 'function') setUser(null)
      }
      toast.success('Signed out successfully')
    } catch (error) {
      toast.error('Error signing out: ' + error.message)
    }
  }

  const avatarSrc =
    user?.photoURL ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      user?.displayName || user?.email || 'User'
    )}`

  const avatarAlt = user?.displayName || 'User avatar'

  // Mobile: keep your original primary hover; Desktop (gray navbar): use gray/white for contrast
  const navItemClass = ({ isActive }) =>
    [
      'transition-colors',
      isActive ? 'text-primary font-semibold' : 'hover:text-primary', // mobile dropdown
      isActive ? 'lg:text-white lg:font-semibold' : 'lg:text-gray-300 lg:hover:text-white', // desktop gray bg
    ].join(' ')

  return (
    <div className="navbar bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 text-gray-100 border-b border-white/10 shadow-md sticky top-0 z-50">
      {/* Left - Logo and Mobile Menu */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li><NavLink to="/" className={navItemClass}>Home</NavLink></li>
            <li><NavLink to="All-vehicle" className={navItemClass}>All Vehicles</NavLink></li>
            <li><NavLink to="Add-vehicle" className={navItemClass}>Add Vehicle</NavLink></li>
            <li><NavLink to="My-vehicles" className={navItemClass}>My Vehicles</NavLink></li>
            <li><NavLink to="My-bookings" className={navItemClass}>My Bookings</NavLink></li>
          </ul>
        </div>

        {/* Logo */}
        <NavLink
          to="/"
          className="momo-trust text-2xl lg:text-2xl xl:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-100 to-white"
        >
          TravelEase
        </NavLink>
      </div>

      {/* Center - Desktop Nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to="/" className={navItemClass}>Home</NavLink></li>
          <li><NavLink to="/All-vehicle" className={navItemClass}>All Vehicles</NavLink></li>
          <li><NavLink to="/Add-vehicle" className={navItemClass}>Add Vehicle</NavLink></li>
          <li><NavLink to="/My-vehicles" className={navItemClass}>My Vehicles</NavLink></li>
          <li><NavLink to="/My-bookings" className={navItemClass}>My Bookings</NavLink></li>
        </ul>
      </div>

      {/* Right - Auth Area */}
      <div className="navbar-end">
        {loading ? (
          <div className="skeleton h-10 w-24" />
        ) : user ? (
          <div className="dropdown dropdown-end">
            {/* Avatar button */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              title="Account"
            >
              <div className="w-10 rounded-full">
                <img
                  src={avatarSrc}
                  alt={avatarAlt}
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                      user?.displayName || user?.email || 'User'
                    )}`
                  }}
                />
              </div>
            </div>

            {/* Dropdown content */}
            <div
              tabIndex={0}
              className="mt-3 z-[1000] card card-compact dropdown-content w-64 bg-base-100 shadow"
            >
              <div className="card-body text-base-content">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={avatarSrc}
                        alt={avatarAlt}
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{user?.displayName || 'User'}</h3>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>

                {/* Theme toggle */}
                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box mt-2">
                  <label className="label cursor-pointer justify-between">
                    <span>Theme</span>
                    <input
                      onChange={(e) => handleTheme(e.target.checked)}
                      type="checkbox"
                      className="toggle"
                      defaultChecked={document.documentElement.getAttribute('data-theme') === 'dark'}
                    />
                  </label>
                </fieldset>

                <button
                  onClick={handleSignOut}
                  className="btn btn-neutral btn-sm mt-3"
                  type="button"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <NavLink
            to="/Login"
            className="btn btn-outline lg:border-gray-300 lg:text-gray-100 lg:hover:bg-white/10"
          >
            Log in
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Navbar