import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import api from '../api/axiosInstance'
import '../styles/auth.css'

function VerifyEmailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ''

  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await api.post('/verify-email', { email, otp })
      setSuccess('Email verified! Redirecting to login…')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">✉</div>
          <h1 className="auth-title">Verify Email</h1>
          <p className="auth-subtitle">
            {email ? (
              <>We sent a code to <strong>{email}</strong></>
            ) : (
              'Enter the OTP sent to your email'
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field-group">
            <label className="field-label" htmlFor="otp">One-Time Password</label>
            <input
              id="otp"
              className="field-input otp-input"
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => { setOtp(e.target.value); setError('') }}
              placeholder="Enter OTP"
              maxLength={10}
              required
              autoComplete="one-time-code"
            />
          </div>

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <button id="verify-submit" className="auth-btn" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Verify Email'}
          </button>
        </form>

        <p className="auth-footer">
          Back to{' '}
          <Link to="/register" className="auth-link">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default VerifyEmailPage
