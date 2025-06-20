import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

// Initialize the WooCommerce API
export const WooCommerceClient = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL || "https://your-store-url.com",
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || "",
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || "",
  version: "wc/v3",
})

// Get all products
export async function getProducts(page = 1, perPage = 10) {
  try {
    const response = await WooCommerceClient.get("products", {
      per_page: perPage,
      page: page,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// Get featured products
export async function getFeaturedProducts(limit = 10) {
  try {
    const response = await WooCommerceClient.get("products", {
      featured: true,
      per_page: limit,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

// Get product by ID
export async function getProductById(id: number) {
  try {
    const response = await WooCommerceClient.get(`products/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    return null
  }
}

// Get all categories
export async function getCategories() {
  try {
    const response = await WooCommerceClient.get("products/categories", {
      per_page: 100,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Get products by category
export async function getProductsByCategory(categoryId: number, page = 1, perPage = 10) {
  try {
    const response = await WooCommerceClient.get("products", {
      category: categoryId,
      per_page: perPage,
      page: page,
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error)
    return []
  }
}

// Create an order
export async function createOrder(orderData: any) {
  try {
    const response = await WooCommerceClient.post("orders", orderData)
    return response.data
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}
