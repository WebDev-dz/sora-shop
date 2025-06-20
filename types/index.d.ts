import { Product } from "./products";
import { Variation } from "./variations";
import { Term } from "./terms";
import { CategoryItem } from "./categories";
import { CreateOrder, Order } from "./orders";

namespace Routes {
    // Products route: /api/products
    export interface Products {
      GET: {
        SearchParams: {
          lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
          [key: string]: any; // Allow additional query params
        };
        Response: Product[];
      };
      Product: {
        GET: {
          params: { id: string };
          SearchParams: {
            lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
          };
          Response: Product;
        };
        Variations: {
          GET: {
            params: { id: string };
            SearchParams: {
              lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
            };
            Response: Variation[];
          };
        };
        Attributes: {
          Terms: {
            GET: {
              params: { id: string };
              SearchParams: {
                lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
              };
              Response: Term[];
            };
          };
        };
      };
    }
  
    // Categories route: /api/categories
    export interface Categories {
      GET: {
        SearchParams: {
          lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
          [key: string]: any; // Allow additional query params
        };
        Response: CategoryItem[];
      };
      Category: {
        GET: {
          params: { id: string };
          SearchParams: {
            lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
          };
          Response: CategoryItem;
        };
      };
    }
  
    // Orders route: /api/orders
    export interface Orders {
      POST: {
        Body: CreateOrder;
        SearchParams: {
          lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
        };
        Response: Order;
      };
    }
  
    // Shippings route: /api/shippings
    export interface Shippings {
      GET: {
        SearchParams: {
          lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
          [key: string]: any; // Allow additional query params
        };
        Response: any; // TBD: Define Shipping interface
      };
    }
  
    // Coupons route: /api/coupons
    export interface Coupons {
      GET: {
        SearchParams: {
          lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
          [key: string]: any; // Allow additional query params
        };
        Response: any; // TBD: Define Coupon interface
      };
    }
  }

  namespace Pages {
    // About page: /about
    export interface AboutPage {
      params: {};
      searchParams: {
        lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
      };
    }
  
    // Cart page: /cart
    export interface CartPage {
      params: {};
      searchParams: {
        lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
      };
      initialData?: {
        cartItems: LineItem[]; // Initial cart items, based on LineItem from Order
        total: string; // Total cart value
      };
    }
  
    // Categories page: /categories
    export interface CategoriesPage {
      params: {
        
      };
      searchParams: {
        lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
        [key: string]: any; // Allow additional query params (e.g., filters)
      };
      initialData?: {
        categories: CategoryItem[]; // Initial list of categories
      };
    }
  
    // Category page: /categories/[id]
    export interface CategoryPage {
      params: { id: string };
      searchParams: {
        lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
        [key: string]: any; // Allow additional query params (e.g., filters)
      };
      initialData?: {
        category?: CategoryItem; // Initial category details
        products?: Product[]; // Optional: Products in this category
      };
    }
  
    // Checkout page: /checkout
    export interface CheckoutPage {
      params: {};
      searchParams: {
        lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
      };
      initialData?: {
        cartItems: LineItem[]; // Initial cart items for checkout
        billing?: Billing; // Optional: Pre-filled billing info
        shipping?: Shipping; // Optional: Pre-filled shipping info
        shippingOptions?: ShippingLine[]; // Available shipping methods
      };
    }
  
    // Contact page: /contact
    export interface ContactPage {
      params: {};
      searchParams: {
        lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
      };
    }
  
    // Products page: /products
    export interface ProductsPage {
      params: {};
      searchParams: {
        lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
        [key: string]: any; // Allow additional query params (e.g., filters, sorting)
      };
      initialData?: {
        products: Product[]; // Initial list of products
      };
    }
  
    // Product page: /products/[id]
    export interface ProductPage {
      params: { id: string };
      searchParams: {
        lang?: 'en' | 'ar' | 'fr'; // Language query param for i18n
        [key: string]: any; // Allow additional query params (e.g., variant selection)
      };
      initialData?: {
        product?: Product; // Initial product details
        variations?: Variation[]; // Optional: Product variations
        attributes?: Term[]; // Optional: Attribute terms for the product
      };
    }
  }


  export interface Wilaya {
    id: string
    code: string
    name: string
    ar_name: string
    longitude: string
    latitude: string
  }
  export interface City {
    id: number
    commune_name_ascii: string
    commune_name: string
    daira_name_ascii: string
    daira_name: string
    wilaya_code: string
    wilaya_name_ascii: string
    wilaya_name: string
  }