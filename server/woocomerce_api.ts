import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import "server-only";


const url = process.env.WOOCOMMERCE_URL ?? "http://localhost:3000";
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY ?? "something-random";
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET ?? "something-random";

export const api = new WooCommerceRestApi({
  url:"https://sorashop.tahnut-shop.store/",
  consumerKey:"ck_cdc57d3beba114183c621a27588d03407f092f5f",
  consumerSecret:"cs_6cb38f13fc64b85ddf89e8845db12f9941e8a5f0",
  version: "wc/v3",
  
})