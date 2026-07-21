const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SEED_PRODUCTS = [
  { 
    id: 1, 
    name: 'Ruby Calm Tea', 
    desc: 'A soothing blend to relax your mind and uplift your mood.', 
    bestSeller: true, 
    price: 450.00, 
    originalPrice: 500, 
    discount: 10, 
    img: '/assets/product/file_000000008de072079cfe74523df70bde.png', 
    rating: 4.5, 
    reviews: 124, 
    category: 'Wellness Blends', 
    weight: '15 Packets'
  },
  {
    id: 2,
    name: 'Emerald Detox',
    desc: 'Refresh your body with our premium green tea blend.',
    bestSeller: false,
    price: 350.00,
    originalPrice: 400,
    discount: 12,
    img: '/assets/product/file_000000005c0c7208a76916f9d6fd84e2.png',
    rating: 4.8,
    reviews: 89,
    category: 'Detox',
    weight: '20 Packets'
  },
  {
    id: 3,
    name: 'Golden Glow',
    desc: 'Turmeric and ginger blend for a radiant morning.',
    bestSeller: true,
    price: 420.00,
    originalPrice: 450,
    discount: 6,
    img: '/assets/product/file_000000006c647208ba636bf3e3e395c1.png',
    rating: 4.6,
    reviews: 210,
    category: 'Morning Energy',
    weight: '15 Packets'
  },
  {
    id: 4,
    name: 'Midnight Slumber',
    desc: 'Chamomile and lavender for a perfect night sleep.',
    bestSeller: false,
    price: 380.00,
    originalPrice: 400,
    discount: 5,
    img: '/assets/product/file_000000008de072079cfe74523df70bde.png',
    rating: 4.9,
    reviews: 156,
    category: 'Sleep',
    weight: '20 Packets'
  }
];

async function seed() {
  try {
    for (const product of SEED_PRODUCTS) {
      await setDoc(doc(db, 'products', product.id.toString()), product);
      console.log('Seeded', product.name);
    }
    console.log('Success');
    process.exit(0);
  } catch (e) {
    console.error('Failed:', e.message);
    process.exit(1);
  }
}
seed();
