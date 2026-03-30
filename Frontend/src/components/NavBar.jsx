import React from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { useAuth } from "../features/auth/hooks/useAuth"

const getInitial = (user) => {
  if (!user) return "U"

  const value = user.username || user.name || user.email || "U"
  return value.trim().charAt(0).toUpperCase()
}

const getDisplayName = (user) => {
  if (!user) return ""
  return user.username || user.name || user.email || "User"
}

const NavBar = () => {
  const { user, loading, handleLogout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const isLoggedIn = Boolean(user)

  const handleLogoutClick = async () => {
    await handleLogout()
    navigate("/login")
  }

  const navLinkClass = (path) =>
    `inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${
      location.pathname === path
        ? "bg-sky-50 text-sky-700"
        : "text-slate-600 hover:bg-slate-50 hover:text-sky-700"
    }`

  return (
    <header className="sticky top-0 z-20 border-b border-sky-100/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-cyan-400 text-lg font-bold text-white shadow-[0_18px_35px_-20px_rgba(14,116,255,0.75)]">
            IM
          </div>
          <div>
            <p className="text-xl font-bold text-slate-800">Interview Master</p>
            <p className="text-sm text-slate-500">Practice smarter</p>
          </div>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          

          {!isLoggedIn && (
            <>
              <Link to="/register" className={navLinkClass("/register")}>
                Register
              </Link>
              <Link
                to="/login"
                className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                  location.pathname === "/login"
                    ? "bg-linear-to-r from-sky-500 to-cyan-400 text-white shadow-[0_18px_35px_-18px_rgba(14,116,255,0.65)]"
                    : "border border-sky-100 bg-white/90 text-slate-600 shadow-[0_12px_30px_-18px_rgba(23,37,84,0.35)] hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700"
                }`}
              >
                Login
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-sky-100 bg-white px-3 py-2 shadow-[0_12px_30px_-18px_rgba(23,37,84,0.25)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sm font-bold text-sky-700">
                  {getInitial(user)}
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">User</p>
                  <p className="text-sm font-semibold text-slate-700">{getDisplayName(user)}</p>
                </div>
              </div>

              <Link to="/" className={navLinkClass("/")}>
                    Home
               </Link>
               
              <button
                type="button"
                onClick={handleLogoutClick}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_35px_-18px_rgba(14,116,255,0.65)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Working..." : "Logout"}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar
