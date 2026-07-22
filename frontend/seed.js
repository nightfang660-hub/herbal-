const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, deleteDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value.length) {
      process.env[key.trim()] = value.join('=').trim();
    }
  });
}

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
    price: 229.00, 
    originalPrice: 269, 
    discount: 15, 
    img: '/assets/product/file_000000008de072079cfe74523df70bde.png', 
    images: [
      '/assets/product/file_000000008de072079cfe74523df70bde.png',
      '/assets/product/file_000000005c0c7208a76916f9d6fd84e2.png',
      '/assets/product/file_000000006c647208ba636bf3e3e395c1.png'
    ],
    rating: 5.0, 
    reviews: 124, 
    category: 'Wellness Blends', 
    weight: '20 sachets'
  }
];

async function seed() {
  try {
    // Clean up cards 2, 3, and 4
    await deleteDoc(doc(db, 'products', '2'));
    await deleteDoc(doc(db, 'products', '3'));
    await deleteDoc(doc(db, 'products', '4'));
    console.log('Removed products 2, 3, 4 from Firestore');

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

