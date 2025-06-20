import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Billing, Shipping, LineItem, Order } from "@/types/orders"
import { Variation } from "@/types/variations"


// Add useGetVariations hook implementation
const getVariations = async (id: number): Promise<Variation[]> => {
    const { data } = await axios.get<Variation[]>(`/apis/products/${id}/variations`)
    return data
  }
  
export  const useGetVariations = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
      mutationFn: getVariations,
      onSuccess: (data) => {
        queryClient.setQueryData(['variations'], data)
      },
    })
  }