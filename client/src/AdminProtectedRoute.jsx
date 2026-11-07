import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
function AdminProtectedRoute({ children }) {
  const location = useLocation()
  const token = localStorage.getItem('aureviaToken')
  const storedUser = localStorage.getItem('aureviaUser')
  let user = null
  try {
    user = storedUser ? JSON.parse(storedUser) : null
  } catch {
    user = null
  }
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }
  return children
}

export default AdminProtectedRoute