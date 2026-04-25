import electronics from "@/assets/cat-electronics.jpg";
import lifestyle from "@/assets/cat-lifestyle.jpg";
import home from "@/assets/cat-home.jpg";
import books from "@/assets/cat-books.jpg";
import fitness from "@/assets/cat-fitness.jpg";
import grocery from "@/assets/cat-grocery.jpg";

export type Category =
  | "Electronics"
  | "Lifestyle"
  | "Home Essentials"
  | "Books"
  | "Fitness"
  | "Grocery";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description: string;
};

export const categories: { name: Category; image: string; tone: string }[] = [
  { name: "Electronics", image: electronics, tone: "bg-primary text-primary-foreground" },
  { name: "Lifestyle", image: lifestyle, tone: "bg-coral text-coral-foreground" },
  { name: "Home Essentials", image: home, tone: "bg-sage text-sage-foreground" },
  { name: "Books", image: books, tone: "bg-primary-soft text-primary-foreground" },
  { name: "Fitness", image: fitness, tone: "bg-accent text-accent-foreground" },
  { name: "Grocery", image: grocery, tone: "bg-amber text-amber-foreground" },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Aurora Wireless Headphones",
    brand: "SonicLab",
    category: "Electronics",
    price: 8999,
    oldPrice: 12999,
    rating: 4.7,
    reviews: 1284,
    image: electronics,
    badge: "Best Seller",
    description:
      "Premium over-ear wireless headphones with adaptive noise cancellation, 40hr battery, and studio-grade drivers tuned by audio engineers.",
  },
  {
    id: "p2",
    name: "Linen Weekender Shirt",
    brand: "Maison Coast",
    category: "Lifestyle",
    price: 2499,
    oldPrice: 3499,
    rating: 4.6,
    reviews: 642,
    image: lifestyle,
    description: "Hand-stitched 100% European linen shirt, breathable for warm afternoons and cool evenings alike.",
  },
  {
    id: "p3",
    name: "Hand-Thrown Ceramic Vase",
    brand: "Atelier Verde",
    category: "Home Essentials",
    price: 1899,
    rating: 4.8,
    reviews: 318,
    image: home,
    badge: "New",
    description: "Hand-thrown stoneware vase finished with a matte glaze. Each piece is unique to its potter.",
  },
  {
    id: "p4",
    name: "The Art of Stillness — Hardcover",
    brand: "Penbrook Press",
    category: "Books",
    price: 799,
    oldPrice: 1199,
    rating: 4.9,
    reviews: 2104,
    image: books,
    description: "A meditative collection of essays on slow living, accompanied by original etchings.",
  },
  {
    id: "p5",
    name: "Studio Yoga Mat — Pro",
    brand: "Kindred Move",
    category: "Fitness",
    price: 3299,
    rating: 4.7,
    reviews: 856,
    image: fitness,
    badge: "Trending",
    description: "6mm cushioned natural rubber mat with non-slip surface, designed for daily practice.",
  },
  {
    id: "p6",
    name: "Cold-Pressed Olive Oil 500ml",
    brand: "Olive Grove Co.",
    category: "Grocery",
    price: 649,
    rating: 4.8,
    reviews: 421,
    image: grocery,
    description: "Single-estate Mediterranean olive oil, cold-pressed within hours of harvest.",
  },
  {
    id: "p7",
    name: "Helios Smartwatch Series 4",
    brand: "Helios",
    category: "Electronics",
    price: 14999,
    oldPrice: 18999,
    rating: 4.5,
    reviews: 932,
    image: electronics,
    badge: "Limited",
    description: "Aluminum case smartwatch with always-on retina display, GPS, and 7-day battery life.",
  },
  {
    id: "p8",
    name: "Brass Tapered Candlesticks (Pair)",
    brand: "Atelier Verde",
    category: "Home Essentials",
    price: 2199,
    rating: 4.6,
    reviews: 174,
    image: home,
    description: "Solid brass candlesticks with hand-finished patina. Sold as a matched pair.",
  },
];

export const trendingDeals = products.filter((p) => p.oldPrice).slice(0, 4);
export const recommendations = products.slice(0, 6);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const findProduct = (id: string) => products.find((p) => p.id === id);
