import React from "react"
import HotelCard from "../components/HotelCard"
import { hotels } from "../data/hotels"

const Home = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Find your perfect stay</h1>

      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}

export default Home
