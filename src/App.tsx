import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Hotels from "./pages/Hotels"
import HotelDetails from "./pages/HotelDetails"
import Booking from "./pages/Booking"
import MyBookings from "./pages/MyBookings"

function App() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Hotels />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route
            path="/booking/:id"
            element={user ? <Booking /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/bookings"
            element={user ? <MyBookings /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
