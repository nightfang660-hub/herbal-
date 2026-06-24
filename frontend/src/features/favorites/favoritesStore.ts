import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteItem {
  id: string; // The product id/sku
  name: string;
  priceCents?: number;
  image?: string;
  category?: string;
  rating?: number;
  reviewsCount?: number;
}

interface FavoritesState {
  items: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      addFavorite: (item) => set((state) => {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) return state;
        return { items: [...state.items, item] };
      }),
      removeFavorite: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      toggleFavorite: (item) => set((state) => {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) {
          return { items: state.items.filter((i) => i.id !== item.id) };
        }
        return { items: [...state.items, item] };
      }),
      isFavorite: (id) => {
        return get().items.some((i) => i.id === id);
      },
      clearFavorites: () => set({ items: [] }),
    }),
    {
      name: 'wellness-favorites-storage',
    }
  )
);
