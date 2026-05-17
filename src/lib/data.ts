import { Place } from "@/types"

export const REAL_PLACES: Place[] = [
  {
    id: "p1",
    name: "L'Avenue",
    category: "French Cuisine",
    rating: 4.8,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1550966841-391ad29a0764?auto=format&fit=crop&w=800&q=80",
    description: "Iconic Parisian brasserie with chic decor and world-class people watching on Avenue Montaigne.",
    location: {
      lat: 48.8661,
      lng: 2.3068,
      address: "41 Av. Montaigne, 75008 Paris"
    },
    isTrending: true
  },
  {
    id: "p2",
    name: "Holybelly 5",
    category: "Brunch Spot",
    rating: 4.6,
    reviews: 850,
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80",
    description: "Famous for seasonal breakfast dishes and some of the best pancakes in the 10th arrondissement.",
    location: {
      lat: 48.8719,
      lng: 2.3592,
      address: "5 Rue Lucien Sampaix, 75010 Paris"
    }
  },
  {
    id: "p3",
    name: "Le Comptoir du Relais",
    category: "Wine Bar",
    rating: 4.9,
    reviews: 2100,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    description: "Classic Saint-Germain bistro offering inventive small plates and an extensive natural wine list.",
    location: {
      lat: 48.8521,
      lng: 2.3387,
      address: "9 Carrefour de l'Odéon, 75006 Paris"
    },
    isTrending: true
  },
  {
    id: "p4",
    name: "Candelaria",
    category: "Cocktail Bar",
    rating: 4.7,
    reviews: 920,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    description: "Hidden speakeasy behind a taco shop. Renowned for its world-class agave-based cocktails.",
    location: {
      lat: 48.8631,
      lng: 2.3643,
      address: "52 Rue de Saintonge, 75003 Paris"
    }
  },
  {
    id: "p5",
    name: "Shakespeare and Company",
    category: "Bookstore",
    rating: 4.9,
    reviews: 3500,
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
    description: "The most famous English-language bookstore in Paris, situated directly across from Notre Dame.",
    location: {
      lat: 48.8525,
      lng: 2.3471,
      address: "37 Rue de la Bûcherie, 75005 Paris"
    }
  },
  {
    id: "p6",
    name: "Septime",
    category: "Fine Dining",
    rating: 4.8,
    reviews: 640,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-modern, seasonal tasting menus in an airy, industrial setting. One of the city's toughest tables.",
    location: {
      lat: 48.8512,
      lng: 2.3813,
      address: "80 Rue de Charonne, 75011 Paris"
    },
    isTrending: true
  },
  {
    id: "p7",
    name: "Boot Café",
    category: "Café",
    rating: 4.5,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80",
    description: "Housed in a former cobbler's shop, this tiny Marais café serves exceptional specialty coffee.",
    location: {
      lat: 48.8604,
      lng: 2.3662,
      address: "19 Rue du Pont aux Choux, 75003 Paris"
    }
  }
]
