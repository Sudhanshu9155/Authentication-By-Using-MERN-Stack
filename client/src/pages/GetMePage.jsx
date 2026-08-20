import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosInstance'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

function GetMePage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [logoutLoading, setLogoutLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/get-me')
        setUser(data.user)
      } catch {
        setError('Session expired. Please log in again.')
        setTimeout(() => navigate('/login'), 2000)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [navigate])

  const handleLogout = async () => {
    setLogoutLoading(true)
    try {
      await api.get('/logout')
    } finally {
      logout()
      navigate('/login')
    }
  }

  const handleLogoutAll = async () => {
    setLogoutLoading(true)
    try {
      await api.get('/logout-all')
    } finally {
      logout()
      navigate('/login')
    }
  }

  if (loading) {
    return (
      <div className="auth-wrapper">
        <div className="auth-card" style={{ alignItems: 'center', gap: '1rem' }}>
          <span className="spinner large" />
          <p style={{ color: 'var(--text-muted)' }}>Loading profile…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="auth-wrapper">
        <div className="auth-card">
          <p className="auth-error">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card profile-card">
        <div className="auth-header">
          <div className="avatar">{user?.username?.[0]?.toUpperCase()}</div>
          <h1 className="auth-title">{user?.username}</h1>
          <p className="auth-subtitle">{user?.email}</p>
          <span className={`badge ${user?.verified ? 'badge-success' : 'badge-warn'}`}>
            {user?.verified ? '✓ Verified' : '✗ Not Verified'}
          </span>
        </div>

        <div className="profile-info">
          <div className="info-row">
            <span className="info-label">User ID</span>
            <span className="info-value">{user?.id}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Username</span>
            <span className="info-value">{user?.username}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email</span>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Status</span>
            <span className="info-value">{user?.verified ? 'Verified' : 'Unverified'}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button
            id="logout-btn"
            className="auth-btn"
            onClick={handleLogout}
            disabled={logoutLoading}
          >
            {logoutLoading ? <span className="spinner" /> : 'Logout'}
          </button>
          <button
            id="logout-all-btn"
            className="auth-btn btn-outline"
            onClick={handleLogoutAll}
            disabled={logoutLoading}
          >
            Logout All Devices
          </button>
        </div>
      </div>
    </div>
  )
}

export default GetMePage
