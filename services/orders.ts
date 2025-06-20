import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Order } from '@/types/orders';
import { toast } from 'sonner';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/apis',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define the Order type




const createOrder = async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> => {
  const { data } = await api.post<Order, {data: Order}>('/orders', order);
  return data;
};


const getOrder = async (id: number): Promise<Order> => {
  const json = await localStorage.getItem(`order-${id}`);
  const data = json ? JSON.parse(json) : undefined;
  return data;
};




export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createOrder,
    onError: (error) => {
      toast.error(error.message);
      console.error('Error creating order:', error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      localStorage.setItem(`order-${data?.id}`, JSON.stringify(data))

      return data;
    },
  });
};


export const useGetOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: getOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
