import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Login: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
          🏨 HotelHub
        </h1>
        <p className="text-center text-slate-600 text-sm mb-8">
          Please sign in to continue
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Go to Home
        </button>

        <p className="text-center text-slate-500 text-xs mt-6">
          You must be logged in to access this page. Please use the Sign In button in the navbar.
        </p>
      </div>
    </div>
  )
}

export default Login
