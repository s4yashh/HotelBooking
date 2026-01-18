import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Hotels from "./pages/Hotels"
import HotelDetails from "./pages/HotelDetails"
import Booking from "./pages/Booking"
import MyBookings from "./pages/MyBookings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hotels />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
