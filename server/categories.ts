import { CategoryItem } from "@/types/categories";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

import "server-only";
import { api } from "./woocomerce_api";
import { mockCategories } from "@/lib/data";




const mode = process.env.MODE;

const isTemplate = mode ? mode === "template" : true

export const CategoriesService = {
    getCategories: async (params: any) : Promise<CategoryItem[]> => {
        if (!isTemplate) {
            return (await api.get('products/categories', params)).data;
        } else {
            return mockCategories.slice(0, params?.limit || 10);
        }
    },
    getCategory: async (id: any) : Promise<CategoryItem | undefined> => {
        if (!isTemplate) {
            // return (await api.get(`products/categories/${id}`)).data;
        } else {
            return mockCategories.find((category: any) => category.id === id);
        }
    },
}