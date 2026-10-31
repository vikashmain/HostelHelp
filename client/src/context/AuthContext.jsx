import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '../api'

const AuthContext = createContext({})

// Keeps track of who is logged in (user) and their row in the profiles table
// (profile: name, room, role). Any component can read them with useAuth().
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('hosteldesk_token')) { setLoading(false); return }
    authApi.me().then(({ user }) => setUser(user))
      .catch(() => localStorage.removeItem('hosteldesk_token')).finally(() => setLoading(false))
  }, [])

  async function authenticate(path, body) {
    try {
      const { user, token } = await path(body)
      localStorage.setItem('hosteldesk_token', token)
      setUser(user)
      return null
    } catch (error) { return error }
  }

  async function signUp({ email, password, name, roomNumber }) {
    return authenticate(authApi.signUp, { email, password, name, roomNumber })
  }

  async function signIn({ email, password }) {
    return authenticate(authApi.signIn, { email, password })
  }

  async function signOut() {
    localStorage.removeItem('hosteldesk_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
