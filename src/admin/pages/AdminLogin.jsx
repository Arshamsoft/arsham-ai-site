"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LockIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="m7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const UserIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const EyeIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
)

const AdminLogin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simple authentication (replace with real authentication)
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAdminLoggedIn", "true")
      navigate("/admin/dashboard")
    } else {
      alert("نام کاربری یا رمز عبور اشتباه است")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg border border-border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <LockIcon className="text-accent-foreground" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-card-foreground">ورود به پنل مدیریت</h1>
            <p className="text-muted-foreground mt-2">برای ادامه وارد حساب کاربری خود شوید</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">نام کاربری</label>
              <div className="relative">
                <UserIcon
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="نام کاربری خود را وارد کنید"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">رمز عبور</label>
              <div className="relative">
                <LockIcon
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="رمز عبور خود را وارد کنید"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال ورود..." : "ورود"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>اطلاعات دمو:</strong>
              <br />
              نام کاربری: admin
              <br />
              رمز عبور: admin
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
