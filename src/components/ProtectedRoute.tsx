import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiLoader, FiShield } from 'react-icons/fi'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, apiStatus, apiUrl } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white select-none">
        <div className="relative flex flex-col items-center max-w-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/5">
            <FiShield className="text-amber-400 animate-pulse" size={32} />
          </div>

          <h2 className="text-xl font-bold tracking-tight text-white mb-2">
            Verifying Admin Session
          </h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Connecting to ShivaSun / Maya Exports Backend API...
          </p>

          <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-800/80 rounded-full border border-slate-700/60 text-xs font-mono text-slate-300">
            <FiLoader className="animate-spin text-amber-400" size={14} />
            <span className="truncate max-w-[220px]">{apiUrl}</span>
          </div>

          {apiStatus === 'offline' && (
            <div className="mt-4 text-[11px] text-amber-400/90 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
              API at port 5000 is still initializing or unreachable. Retrying...
            </div>
          )}
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login page, preserving attempted destination
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
