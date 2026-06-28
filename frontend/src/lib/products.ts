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

// Temporary hardcoded data to seed
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
      "/assets/product/file_000000008de072079cfe74523df70bde.png",
      "/assets/product/file_000000005c0c7208a76916f9d6fd84e2.png",
      "/assets/product/file_000000006c647208ba636bf3e3e395c1.png"
    ],
    rating: 4.5, 
    reviews: 124, 
    category: "Wellness Blends", 
    type: "Herbal", 
    weight: "20 Packets", 
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
      products.push(doc.data() as Product);
    });
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
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    // Fallback to seed data
    return SEED_PRODUCTS.find(p => p.id.toString() === id.toString()) || null;
  }
}
