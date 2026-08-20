import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))
  const [loading, setLoading] = useState(true)

  // On mount, try to restore session via refresh-token cookie
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await axios.post('/api/auth/refresh-token', {}, { withCredentials: true })
        setAccessToken(data.accessToken)
        localStorage.setItem('accessToken', data.accessToken)
      } catch {
        // No valid refresh token — user must log in
        setAccessToken(null)
        localStorage.removeItem('accessToken')
      } finally {
        setLoading(false)
      }
    }
    restoreSession()
  }, [])

  const login = (token, userData) => {
    setAccessToken(token)
    setUser(userData)
    localStorage.setItem('accessToken', token)
  }

  const logout = () => {
    setAccessToken(null)
    setUser(null)
    localStorage.removeItem('accessToken')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
