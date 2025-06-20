import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

import "server-only";
import { CreateOrder, Order } from '../types/orders';
import { api } from "./woocomerce_api";




const mode = process.env.MODE;

const isTemplate = mode ? mode === "template" : true
const mockOrders:any[] = [];

export const OrdersService = {
    
    createOrder: async (data: CreateOrder) : Promise<Order | undefined> => {
        if (!isTemplate) {
            return(await api.post(`orders/`, data)).data;
        } else {
            return mockOrders.at(0);
        }
    },
}