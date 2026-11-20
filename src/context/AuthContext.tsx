import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api, type AdminUser, API_TARGET_URL } from '../lib/api'

interface AuthContextType {
  admin: AdminUser | null
  isAuthenticated: boolean
  isLoading: boolean
  apiStatus: 'checking' | 'connected' | 'offline'
  apiUrl: string
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const LOCAL_STORAGE_USER_KEY = 'shivasun_admin_user'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'offline'>('checking')

  // Verify authentication with backend
  const checkAuth = useCallback(async () => {
    setIsLoading(true)
    try {
      // 1. Check health
      const health = await api.health.check()
      if (health.ok) {
        setApiStatus('connected')
      } else {
        setApiStatus('offline')
      }

      // 2. Check active session (/auth/me)
      const res = await api.auth.me()
      if (res?.data?.admin) {
        setAdmin(res.data.admin)
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.admin))
      } else {
        setAdmin(null)
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
      }
    } catch (err: any) {
      // If 401, not logged in
      if (err?.status === 401) {
        setAdmin(null)
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
      } else {
        // Network or server issue
        const health = await api.health.check()
        setApiStatus(health.ok ? 'connected' : 'offline')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (email: string, pass: string) => {
    setIsLoading(true)
    try {
      const res = await api.auth.login(email, pass)
      if (res?.data?.admin) {
        setAdmin(res.data.admin)
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.admin))
        setApiStatus('connected')
        return { success: true, message: res.message || 'Logged in successfully' }
      }
      return { success: false, message: 'Invalid response from server' }
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || 'Login failed. Please check credentials or API connection.',
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await api.auth.logout()
    } catch {
      // ignore network errors on logout
    } finally {
      setAdmin(null)
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated: Boolean(admin),
        isLoading,
        apiStatus,
        apiUrl: API_TARGET_URL,
        login,
        logout,
        refreshAuth: checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
