import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/types/products';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/apis',
  headers: {
    'Content-Type': 'application/json',
  },
});



// API functions
const getProducts = async (params: any): Promise<Product[]> => {
  const { data } = await api.get<Product[]>('/products', params);
  return data;
};

const getProduct = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

// React Query hooks
export const useGetProducts = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: getProducts,
    onSuccess: (data) => {
      // Update the cache with the fetched data
      queryClient.setQueryData(['products'], data);
    },
  });
};

export const useGetProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: getProduct,
    onSuccess: (data) => {
      // Update the cache with the fetched product
      queryClient.setQueryData(['product', data.id], data);
    },
  });
};
