import { db } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  createdAt: string;
}

export interface Address {
  id?: string;
  title?: string; // used in profile
  isDefault?: boolean; // used in profile
  name?: string; // used in profile
  addressLine1?: string; // used in profile
  addressLine2?: string; // used in profile
  phone?: string; // used in profile
  fullName?: string; // used in checkout
  mobileNo?: string; // used in checkout
  postalCode?: string;
  houseNumber?: string;
  address?: string;
  locality?: string;
  city?: string;
  stateName?: string;
  addressType?: string;
}

// Profile Info
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
}

export async function updateUserProfile(uid: string, profileData: Partial<UserProfile>) {
  const docRef = doc(db, 'users', uid);
  await setDoc(docRef, profileData, { merge: true });
}

// Addresses
export async function getUserAddresses(uid: string): Promise<Address[]> {
  const addressesRef = collection(db, 'users', uid, 'addresses');
  const querySnapshot = await getDocs(addressesRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Address));
}

export async function addUserAddress(uid: string, address: Omit<Address, 'id'>) {
  const addressesRef = collection(db, 'users', uid, 'addresses');
  const docRef = await addDoc(addressesRef, address);
  return docRef.id;
}

export async function updateUserAddress(uid: string, addressId: string, address: Partial<Address>) {
  const addressRef = doc(db, 'users', uid, 'addresses', addressId);
  await updateDoc(addressRef, address);
}

export async function deleteUserAddress(uid: string, addressId: string) {
  const addressRef = doc(db, 'users', uid, 'addresses', addressId);
  await deleteDoc(addressRef);
}

// Orders (Mock saving for frontend purposes, actual orders might go through backend)
export async function saveUserOrder(uid: string, orderData: any) {
  const ordersRef = collection(db, 'users', uid, 'orders');
  await addDoc(ordersRef, { ...orderData, createdAt: new Date().toISOString() });
}

export async function getUserOrders(uid: string) {
  const ordersRef = collection(db, 'users', uid, 'orders');
  const querySnapshot = await getDocs(ordersRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
