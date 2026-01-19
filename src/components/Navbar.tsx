import { Link } from "react-router-dom"
import { LogOut } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import React from "react"
interface NavbarProps {
  onOpenAuth: () => void
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const { user, signOut } = useAuth()

  const handleLogout = () => {
    signOut()
    window.location.href = "/"
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <Link
        to="/"
        className="flex items-center gap-2 text-blue-600 font-bold text-2xl cursor-pointer hover:text-blue-700 transition-colors"
      >
        <span className="text-3xl">🏨</span>
        <span className="tracking-tight text-slate-900">HotelHub</span>
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4 ml-auto">
            <Link
              to="/"
              className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/my-bookings"
              className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
            >
              My Bookings
            </Link>
            <span className="hidden md:block text-sm font-medium text-slate-600 border-l pl-4 border-slate-200">
              {user.name || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  )
}
