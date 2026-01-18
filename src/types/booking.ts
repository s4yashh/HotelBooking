export interface Booking {
  id: string
  hotelId: number
  hotelName: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "confirmed" | "pending" | "cancelled"
  bookingDate: string
}
