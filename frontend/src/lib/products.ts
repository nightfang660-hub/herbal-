import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface Product {
  id: string | number;
  name: string;
  desc?: string;
  description?: string;
  bestSeller?: boolean;
  price: number;
  originalPrice: number;
  discount: number;
  img: string;
  images?: string[];
  rating: number;
  reviews: number;
  category: string;
  type: string;
  weight: string;
  benefit: string;
  ingredient: string;
}

const SEED_PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "Ruby Calm Tea", 
    desc: "A soothing blend to relax your mind and uplift your mood.", 
    description: "A soothing blend of premium herbs designed to promote relaxation. Perfect for winding down after a long day.",
    bestSeller: true, 
    price: 450.00, 
    originalPrice: 500, 
    discount: 10, 
    img: "/assets/product/file_000000008de072079cfe74523df70bde.png", 
    images: [
      "/assets/product/file_000000008de072079cfe74523df70bde.png"
    ],
    rating: 4.5, 
    reviews: 124, 
    category: "Wellness Blends", 
    type: "Herbal", 
    weight: "15 Packets", 
    benefit: "Relaxation", 
    ingredient: "Mint" 
  },
  {
    id: 2,
    name: "Emerald Detox",
    desc: "Refresh your body with our premium green tea blend.",
    description: "Packed with antioxidants, this green tea blend helps detoxify your body and boost your metabolism naturally.",
    bestSeller: false,
    price: 350.00,
    originalPrice: 400,
    discount: 12,
    img: "/assets/product/file_000000005c0c7208a76916f9d6fd84e2.png",
    images: [
      "/assets/product/file_000000005c0c7208a76916f9d6fd84e2.png"
    ],
    rating: 4.8,
    reviews: 89,
    category: "Detox",
    type: "Green Tea",
    weight: "20 Packets",
    benefit: "Detox",
    ingredient: "Green Tea"
  },
  {
    id: 3,
    name: "Golden Glow",
    desc: "Turmeric and ginger blend for a radiant morning.",
    description: "Start your day with this anti-inflammatory powerhouse. The perfect balance of earthy turmeric and spicy ginger.",
    bestSeller: true,
    price: 420.00,
    originalPrice: 450,
    discount: 6,
    img: "/assets/product/file_000000006c647208ba636bf3e3e395c1.png",
    images: [
      "/assets/product/file_000000006c647208ba636bf3e3e395c1.png"
    ],
    rating: 4.6,
    reviews: 210,
    category: "Morning Energy",
    type: "Herbal",
    weight: "15 Packets",
    benefit: "Energy",
    ingredient: "Turmeric"
  },
  {
    id: 4,
    name: "Midnight Slumber",
    desc: "Chamomile and lavender for a perfect night sleep.",
    description: "Drift into a peaceful sleep with our calming chamomile and lavender blend. Naturally caffeine-free.",
    bestSeller: false,
    price: 380.00,
    originalPrice: 400,
    discount: 5,
    img: "/assets/product/file_000000008de072079cfe74523df70bde.png",
    images: [
      "/assets/product/file_000000008de072079cfe74523df70bde.png"
    ],
    rating: 4.9,
    reviews: 156,
    category: "Sleep",
    type: "Herbal",
    weight: "20 Packets",
    benefit: "Sleep Support",
    ingredient: "Chamomile"
  }
];

export async function seedProducts() {
  try {
    console.log('Starting seed...');
    for (const product of SEED_PRODUCTS) {
      const productRef = doc(db, 'products', product.id.toString());
      await setDoc(productRef, product);
      console.log(`Seeded product: ${product.name}`);
    }
    console.log('Seeding complete!');
    return true;
  } catch (error) {
    console.error('Error seeding products:', error);
    return false;
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data() as Product);
    });
    if (products.length === 0) {
      return SEED_PRODUCTS;
    }
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to seed data if Firestore fails/rules deny access
    return SEED_PRODUCTS;
  }
}

export async function getProductById(id: string | number): Promise<Product | null> {
  try {
    const productRef = doc(db, 'products', id.toString());
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      return productSnap.data() as Product;
    }
    // Fallback if not found in db (e.g. unseeded Vercel environment)
    return SEED_PRODUCTS.find(p => p.id.toString() === id.toString()) || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    // Fallback to seed data
    return SEED_PRODUCTS.find(p => p.id.toString() === id.toString()) || null;
  }
}
