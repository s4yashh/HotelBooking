export interface Hotel {
  id: number
  name: string
  city: string
  price: number
  rating: number
  reviews: number
  amenities: string[]
  image: string
  type: "Hotel" | "Resort" | "Apartment"
}
