import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryItem } from '@/types/categories';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/apis',
  headers: {
    'Content-Type': 'application/json',
  },
});



// API functions
const getCategories = async (): Promise<CategoryItem[]> => {
  const { data } = await api.get<CategoryItem[]>('/categories');
  return data;
};

const getCategoryItem = async (id: number): Promise<CategoryItem> => {
  const { data } = await api.get<CategoryItem>(`/categories/${id}`);
  return data;
};



// React Query hooks
export const useGetCategories = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: getCategories,
    onSuccess: (data) => {
      queryClient.setQueryData(['categories'], data);
    },
  });
};

export const useGetCategoryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: getCategoryItem,
    onSuccess: (data) => {
      queryClient.setQueryData(['category', data.id], data);
    },
  });
};

