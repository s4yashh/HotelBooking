import { Hotel } from "../types/hotel"

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    city: "Delhi",
    price: 4500,
    rating: 4.5,
    reviews: 1200,
    amenities: ["WiFi", "Pool", "AC", "Parking"],
    image: "https://source.unsplash.com/800x600/?hotel",
    type: "Hotel",
  },
  {
    id: 2,
    name: "Ocean View Resort",
    city: "Goa",
    price: 7500,
    rating: 4.8,
    reviews: 980,
    amenities: ["WiFi", "Pool", "Beach", "AC"],
    image: "https://source.unsplash.com/800x600/?resort",
    type: "Resort",
  },
  {
    id: 3,
    name: "City Stay Apartments",
    city: "Bangalore",
    price: 3200,
    rating: 4.2,
    reviews: 540,
    amenities: ["WiFi", "Kitchen", "Parking"],
    image: "https://source.unsplash.com/800x600/?apartment",
    type: "Apartment",
  },
]
