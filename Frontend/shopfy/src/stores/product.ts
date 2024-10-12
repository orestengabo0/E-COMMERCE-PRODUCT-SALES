import {create} from 'zustand';
import axios from 'axios';

export interface Category {
    _id: string,
    name: string
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: Category;
  stock: number;
  brand: { name: string };
  images: { url: string; altText: string }[];
  ratings: {
    average: number;
    count: number;
    users: { user: string; product: string; rating: number }[];
  };
  createdAt: string;
}

interface ProductState {
  products: Product[];
  fetchProducts: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  error: null,
  isLoading: false,
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      const data = response.data;
      if (data.success) {
        set({ products: data.data, isLoading: false });
      } else {
        set({ error: 'Failed to fetch products', isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message || 'An error occurred', isLoading: false });
    }
  },
}));
