import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import "server-only";


const url = process.env.WOOCOMMERCE_URL ?? "http://localhost:3000";
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY ?? "something-random";
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET ?? "something-random";

export const api = new WooCommerceRestApi({
  url,
  consumerKey,
  consumerSecret,
  version: "wc/v3",
  
})