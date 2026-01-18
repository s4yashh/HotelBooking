export interface Hotel {
  id: string
  name: string
  city: string
  price: number
  rating: number
  image: string
  type: "Hotel" | "Resort" | "Apartment"
  amenities: string[]
}
