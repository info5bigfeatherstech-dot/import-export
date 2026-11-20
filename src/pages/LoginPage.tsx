import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  FiLock,
  FiMail,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
  FiGlobe,
  FiKey,
} from 'react-icons/fi'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, isLoading, apiStatus, apiUrl } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/admin'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!email.trim() || !password) {
      setErrorMessage('Please enter your email and password.')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await login(email.trim(), password)
      if (result.success) {
        const from = (location.state as any)?.from?.pathname || '/admin'
        navigate(from, { replace: true })
      } else {
        setErrorMessage(result.message || 'Invalid credentials. Please verify and try again.')
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An error occurred while connecting to the server.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Quick fill demo credentials
  const fillDemoCredentials = () => {
    setEmail('admin@mayaexports.com')
    setPassword('ChangeMeNow123!')
    setErrorMessage(null)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-[Inter,system-ui,sans-serif] text-slate-800 antialiased selection:bg-slate-200">
      {/* Top Header */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-102 transition-transform">
            S
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 tracking-tight leading-tight">
              ShivaSun Moderno Impex
            </div>
            <div className="text-[11px] text-slate-500">Sourcing & Product Admin</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
              apiStatus === 'connected'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : apiStatus === 'checking'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}
            title={`API: ${apiUrl}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                apiStatus === 'connected'
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-rose-500'
              }`}
            />
            <span className="hidden sm:inline font-mono text-[11px]">
              {apiStatus === 'connected' ? 'API 5000 Online' : 'API Offline'}
            </span>
            <span className="sm:hidden text-[11px]">
              {apiStatus === 'connected' ? 'Online' : 'Offline'}
            </span>
          </div>

          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <FiGlobe size={13} />
            <span className="hidden sm:inline">Storefront</span>
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="w-full max-w-md mx-auto px-4 py-8">
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-200/50 p-7 sm:p-9">
          {/* Card Title */}
          <div className="text-left mb-6">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Sign In to Admin
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Enter your authorized staff credentials to continue.
            </p>
          </div>

          {/* Quick Demo Credentials Box */}
          <div className="mb-6 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                <FiKey size={12} className="text-slate-500" />
                <span>Backend Admin Account</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono truncate">
                admin@mayaexports.com
              </div>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0"
            >
              Fill Credentials
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
              <FiAlertCircle size={15} className="text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <FiMail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mayaexports.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 focus:border-slate-800 focus:ring-3 focus:ring-slate-900/10 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-2xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Password
                </label>
                <span className="text-[11px] text-slate-400">JWT Protected</span>
              </div>
              <div className="relative">
                <FiLock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 focus:border-slate-800 focus:ring-3 focus:ring-slate-900/10 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full mt-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting || isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Secure connection notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <FiCheckCircle size={13} className="text-emerald-500 shrink-0" />
            <span>Target API: {apiUrl}</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} ShivaSun Moderno Impex Pvt. Ltd. All rights reserved.
      </footer>
    </div>
  )
}
