import React from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import HotelDetails from "./pages/HotelDetails"
import Booking from "./pages/Booking"
import BookingSuccess from "./pages/BookingSuccess"
import MyBookings from "./pages/MyBookings"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/hotel/:id/book" element={<Booking />} />
        <Route path="/booking/success" element={<BookingSuccess />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  )
}
