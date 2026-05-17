import { Place } from "@/types"

export const MOCK_PLACES: Place[] = [
  {
    id: "1",
    name: "L'Avenue",
    category: "French Cuisine",
    rating: 4.8,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1550966841-391ad29a0764?auto=format&fit=crop&w=800&q=80",
    description: "Iconic Parisian brasserie with chic decor and world-class people watching.",
    location: {
      lat: 48.8661,
      lng: 2.3068,
      address: "41 Av. Montaigne, 75008 Paris"
    },
    isTrending: true
  },
  {
    id: "2",
    name: "Holybelly 5",
    category: "Brunch Spot",
    rating: 4.6,
    reviews: 850,
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80",
    description: "The best pancakes in the 10th. Famous for seasonal breakfast dishes.",
    location: {
      lat: 48.8719,
      lng: 2.3592,
      address: "5 Rue Lucien Sampaix, 75010 Paris"
    }
  },
  {
    id: "3",
    name: "Le Comptoir",
    category: "Wine Bar",
    rating: 4.9,
    reviews: 2100,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    description: "Classic Saint-Germain bistro offering inventive small plates and natural wines.",
    location: {
      lat: 48.8521,
      lng: 2.3387,
      address: "9 Carrefour de l'Odéon, 75006 Paris"
    },
    isTrending: true
  }
]
