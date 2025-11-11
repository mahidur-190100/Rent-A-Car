import React, { useContext } from 'react'
import { Navigate} from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext) || {}
  

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/Login"/>
  }

  return children
}

export default PrivateRoute