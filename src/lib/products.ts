import whisky from "@/assets/p-whisky.jpg";
import wine from "@/assets/p-wine.jpg";
import gin from "@/assets/p-gin.jpg";
import tequila from "@/assets/p-tequila.jpg";
import champagne from "@/assets/p-champagne.jpg";

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  category: "Whisky" | "Wine" | "Gin" | "Tequila" | "Champagne" | "Vodka" | "Beer" | "Cognac";
  brand: string;
  country: string;
  abv: number;
  price: number;
  image: string;
  badge?: "Best Seller" | "New" | "Deal";
  description: string;
  pairings: string[];
  rating: number;
  reviewCount: number;
};

export const products: Product[] = [
  {
    id: "highland-reserve-18",
    name: "Highland Reserve 18Y",
    subtitle: "Single Malt Scotch",
    category: "Whisky",
    brand: "Highland Reserve",
    country: "Scotland",
    abv: 43,
    price: 12500,
    image: whisky,
    badge: "Best Seller",
    description: "An eighteen-year-old Highland single malt, matured in first-fill sherry casks. Layered with dried fig, toasted oak, and a slow ribbon of smoke.",
    pairings: ["Aged cheddar", "Dark chocolate", "Smoked nyama choma"],
    rating: 4.8,
    reviewCount: 312,
  },
  {
    id: "chateau-margaux-2015",
    name: "Château Margaux 2015",
    subtitle: "Bordeaux Red",
    category: "Wine",
    brand: "Château Margaux",
    country: "France",
    abv: 13.5,
    price: 84200,
    image: wine,
    description: "A first-growth Bordeaux from a celebrated vintage. Plush blackcurrant, violets, and graphite carried by silken tannins.",
    pairings: ["Roast lamb", "Aged comté", "Truffle pasta"],
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: "botanist-secret-4",
    name: "Botanist's Secret No. 4",
    subtitle: "London Dry Gin",
    category: "Gin",
    brand: "Botanist's Secret",
    country: "England",
    abv: 44,
    price: 4800,
    image: gin,
    badge: "New",
    description: "A bright, citrus-forward London Dry distilled with twenty-two botanicals including coriander, angelica, and pink peppercorn.",
    pairings: ["Tonic & grapefruit", "Oysters", "Goat cheese"],
    rating: 4.7,
    reviewCount: 204,
  },
  {
    id: "reserva-del-sol",
    name: "Reserva del Sol Añejo",
    subtitle: "100% Blue Agave",
    category: "Tequila",
    brand: "Reserva del Sol",
    country: "Mexico",
    abv: 40,
    price: 18900,
    image: tequila,
    description: "Aged eighteen months in American oak. Honeyed agave, vanilla bean, and a long warm caramel finish.",
    pairings: ["Citrus ceviche", "Grilled prawns", "Dark chocolate"],
    rating: 4.8,
    reviewCount: 156,
  },
  {
    id: "maison-doré-brut",
    name: "Maison Doré Brut",
    subtitle: "Champagne",
    category: "Champagne",
    brand: "Maison Doré",
    country: "France",
    abv: 12,
    price: 9800,
    image: champagne,
    badge: "Deal",
    description: "A vibrant non-vintage cuvée with fine persistent bubbles, brioche, white peach, and a crisp mineral finish.",
    pairings: ["Oysters", "Sushi", "Cured ham"],
    rating: 4.6,
    reviewCount: 421,
  },
  {
    id: "highland-reserve-12",
    name: "Highland Reserve 12Y",
    subtitle: "Single Malt Scotch",
    category: "Whisky",
    brand: "Highland Reserve",
    country: "Scotland",
    abv: 40,
    price: 6400,
    image: whisky,
    description: "A gentler twelve-year-old expression. Honey, orchard fruit, and gentle peat.",
    pairings: ["Smoked salmon", "Apple tart", "Roast pork"],
    rating: 4.5,
    reviewCount: 540,
  },
  {
    id: "domaine-loire-blanc",
    name: "Domaine Loire Blanc",
    subtitle: "Sancerre",
    category: "Wine",
    brand: "Domaine Loire",
    country: "France",
    abv: 12.5,
    price: 5400,
    image: wine,
    badge: "Deal",
    description: "Crisp, mineral Sauvignon Blanc from the Loire — gooseberry, lemon zest, and wet stone.",
    pairings: ["Goat cheese", "Tilapia", "Fresh salads"],
    rating: 4.6,
    reviewCount: 198,
  },
  {
    id: "ember-blanco",
    name: "Ember Blanco",
    subtitle: "Plata Tequila",
    category: "Tequila",
    brand: "Ember",
    country: "Mexico",
    abv: 40,
    price: 7200,
    image: tequila,
    description: "Unaged plata with fresh agave, lime peel, and a clean peppery finish — built for cocktails.",
    pairings: ["Tacos al pastor", "Lime", "Spicy salsa"],
    rating: 4.4,
    reviewCount: 312,
  },
];

export const categories = [
  { name: "Whisky", count: 84, image: whisky },
  { name: "Wine", count: 142, image: wine },
  { name: "Gin", count: 56, image: gin },
  { name: "Tequila", count: 38, image: tequila },
  { name: "Champagne", count: 41, image: champagne },
  { name: "Vodka", count: 47, image: gin },
  { name: "Beer", count: 96, image: champagne },
  { name: "Cognac", count: 22, image: whisky },
] as const;

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatKsh(n: number) {
  return "KSh " + n.toLocaleString("en-KE");
}
