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
    price: 229.00, 
    originalPrice: 269, 
    discount: 15, 
    img: "/assets/product/file_000000008de072079cfe74523df70bde.png", 
    images: [
      "/assets/product/file_000000008de072079cfe74523df70bde.png",
      "/assets/product/file_000000005c0c7208a76916f9d6fd84e2.png",
      "/assets/product/file_000000006c647208ba636bf3e3e395c1.png"
    ],
    rating: 5.0, 
    reviews: 124, 
    category: "Wellness Blends", 
    type: "Herbal", 
    weight: "20 sachets", 
    benefit: "Relaxation", 
    ingredient: "Mint" 
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
      const data = doc.data() as Product;
      if (String(data.id) !== '2' && String(data.id) !== '3' && String(data.id) !== '4') {
        products.push(data);
      }
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
