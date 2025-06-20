import { Attribute } from "@/types/attributes";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

import "server-only";
import { api } from "./woocomerce_api";




const mode = process.env.MODE;

const isTemplate = mode ? mode === "template" : true
const mockAttributes:any[] = [];

export const AttributesService = {
    getAttributes: async (productId: any, params: any) : Promise<Attribute[]> => {
        if (!isTemplate) {
            return (await api.get(`products/${productId}/attributes`, params)).data
        } else {
            return mockAttributes;
        }
    },
   
}