import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function MainDashboard() {
    // TODO: Add a dashboard here
    const {currentUser} = useAuth();
    const navigate = useNavigate();

  return (
    <div>MainDashboard</div>
  )
}
