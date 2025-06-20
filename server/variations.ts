import { Variation } from "@/types/variations";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

import "server-only";
import { api } from "./woocomerce_api";
import { mockVariations } from "@/lib/data";


const mode = process.env.MODE;

const isTemplate = mode ? mode === "template" : true



export const VariationsService = {
    getVariations: async (productId: any, params: any) : Promise<Variation[]> => {
        if (!isTemplate) {
            return (await api.get(`products/${productId}/variations`, params)).data
        } else {
            return Object.values(mockVariations).flat();
        }
    },
   
}