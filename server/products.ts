import { Product } from "@/types/products";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

import "server-only";
import { api } from "./woocomerce_api";
import { mockProducts } from "@/lib/data";




const mode = process.env.MODE;

const isTemplate = mode ? mode === "template" : true

export const ProductsService = {
    getProducts: async (params: any) : Promise<Product[]> => {
        if (!isTemplate) {
            return (await api.get('products', params)).data;
        } else {
            return mockProducts.slice(0, params?.limit || 6);
        }
    },
    getProduct: async (id: any) : Promise<Product | undefined> => {
        if (!isTemplate) {
            return (await api.get(`products/${id}`)).data;
        } else {
            return mockProducts.find((product: any) => product.id === Number(id));
        }
    },
}