export interface Hotel {
  id: number
  name: string
  city: string
  price: number
  rating: number
  image: string
  amenities: string[]
}

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Ocean View Resort",
    city: "Goa",
    price: 4200,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2101d",
    amenities: ["WiFi", "Pool", "AC", "Parking"],
  },
  {
    id: 2,
    name: "Mountain Retreat",
    city: "Manali",
    price: 3100,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    amenities: ["WiFi", "Heater", "Parking"],
  },
  {
    id: 3,
    name: "City Lights Hotel",
    city: "Bangalore",
    price: 2800,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    amenities: ["WiFi", "AC"],
  },
]
