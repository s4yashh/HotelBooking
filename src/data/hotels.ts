export interface Hotel {
  id: number
  name: string
  city: string
  price: number
  rating: number
  reviews: number
  amenities: string[]
  image: string
}

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    city: "Delhi",
    price: 4200,
    rating: 4.5,
    reviews: 1240,
    amenities: ["WiFi", "Pool", "Parking", "AC"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
  },
  {
    id: 2,
    name: "Ocean View Resort",
    city: "Goa",
    price: 6500,
    rating: 4.8,
    reviews: 980,
    amenities: ["WiFi", "Pool", "Beach", "Bar"],
    image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210d1"
  },
  {
    id: 3,
    name: "City Lights Hotel",
    city: "Mumbai",
    price: 5300,
    rating: 4.2,
    reviews: 670,
    amenities: ["WiFi", "AC", "Parking"],
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
  }
]
