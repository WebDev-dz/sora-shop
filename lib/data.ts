import { CategoryItem } from "@/types/categories"
import { Product } from "@/types/products"
import { Variation } from "@/types/variations"




export const mockProducts: Product[] = [{
    "id": 1001,
    "name": "iPhone 15 Pro Max",
    "slug": "iphone-15-pro-max",
    "permalink": "https://example.com/product/iphone-15-pro-max/",
    "date_created": "2024-01-15T10:30:00",
    "date_created_gmt": "2024-01-15T15:30:00",
    "date_modified": "2024-01-15T10:30:00",
    "date_modified_gmt": "2024-01-15T15:30:00",
    "type": "variable",
    "status": "publish",
    "featured": true,
    "catalog_visibility": "visible",
    "description": "<p>The most advanced iPhone ever with titanium design, A17 Pro chip, and pro camera system for stunning photos and videos.</p>",
    "short_description": "<p>Latest iPhone with titanium design and A17 Pro chip.</p>",
    "sku": "IPH15PM001",
    "price": "1199.00",
    "regular_price": "1199.00",
    "sale_price": "",
    "on_sale": false,
    "purchasable": true,
    "total_sales": 156,
    "stock_quantity": 20,
    "virtual": false,
    "downloadable": false,
    "stock_status": "instock",
    "categories": [
      {"id": 1, "name": "Electronics", "slug": "electronics"},
      {"id": 2, "name": "Smartphones", "slug": "smartphones"}
    ],
    "images": [
      {
        "id": 1001,
        "src": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop",
        "name": "iPhone 15 Pro Max",
        "alt": "iPhone 15 Pro Max front view"
      }
    ],
    "attributes": [
      {
        "id": 1,
        "name": "Color",
        "options": ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"]
      },
      {
        "id": 2,
        "name": "Storage",
        "options": ["256GB", "512GB", "1TB"]
      }
    ],
    "_links": {
      "self": [{"href": "https://example.com/wp-json/wc/v3/products/1001"}],
      "collection": [{"href": "https://example.com/wp-json/wc/v3/products"}]
    }
  },
  {
    "id": 1002,
    "name": "Samsung Galaxy S24 Ultra",
    "slug": "samsung-galaxy-s24-ultra",
    "permalink": "https://example.com/product/samsung-galaxy-s24-ultra/",
    "date_created": "2024-01-20T14:15:00",
    "date_created_gmt": "2024-01-20T19:15:00",
    "date_modified": "2024-01-20T14:15:00",
    "date_modified_gmt": "2024-01-20T19:15:00",
    "type": "simple",
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "<p>Premium Android smartphone with S Pen, advanced camera system, and all-day battery life.</p>",
    "short_description": "<p>Premium Android with S Pen and pro cameras.</p>",
    "sku": "SAM24U001",
    "price": "1099.00",
    "regular_price": "1299.00",
    "sale_price": "1099.00",
    "on_sale": true,
    "purchasable": true,
    "total_sales": 89,
    "categories": [
      {"id": 1, "name": "Electronics", "slug": "electronics"},
      {"id": 2, "name": "Smartphones", "slug": "smartphones"}
    ],
    "images": [
      {
        "id": 1002,
        "src": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop",
        "name": "Samsung Galaxy S24 Ultra",
        "alt": "Samsung Galaxy S24 Ultra"
      }
    ],
    "_links": {
      "self": [{"href": "https://example.com/wp-json/wc/v3/products/1002"}],
      "collection": [{"href": "https://example.com/wp-json/wc/v3/products"}]
    }
  },
  {
    "id": 1003,
    "name": "Google Pixel 8 Pro",
    "slug": "google-pixel-8-pro",
    "permalink": "https://example.com/product/google-pixel-8-pro/",
    "date_created": "2024-01-25T09:45:00",
    "date_created_gmt": "2024-01-25T14:45:00",
    "date_modified": "2024-01-25T09:45:00",
    "date_modified_gmt": "2024-01-25T14:45:00",
    "type": "simple",
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "<p>Pure Android experience with advanced AI features and exceptional camera performance powered by Google Tensor G3.</p>",
    "short_description": "<p>Pure Android with AI-powered camera features.</p>",
    "sku": "GPX8P001",
    "price": "899.00",
    "regular_price": "899.00",
    "sale_price": "",
    "on_sale": false,
    "purchasable": true,
    "total_sales": 67,
    "categories": [
      {"id": 1, "name": "Electronics", "slug": "electronics"},
      {"id": 2, "name": "Smartphones", "slug": "smartphones"}
    ],
    "images": [
      {
        "id": 1003,
        "src": "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop",
        "name": "Google Pixel 8 Pro",
        "alt": "Google Pixel 8 Pro"
      }
    ],
    "_links": {
      "self": [{"href": "https://example.com/wp-json/wc/v3/products/1003"}],
      "collection": [{"href": "https://example.com/wp-json/wc/v3/products"}]
    }
  },
  {
    "id": 1004,
    "name": "OnePlus 12",
    "slug": "oneplus-12",
    "permalink": "https://example.com/product/oneplus-12/",
    "date_created": "2024-02-01T11:20:00",
    "date_created_gmt": "2024-02-01T16:20:00",
    "date_modified": "2024-02-01T11:20:00",
    "date_modified_gmt": "2024-02-01T16:20:00",
    "type": "simple",
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "<p>Flagship killer with Snapdragon 8 Gen 3, ultra-fast charging, and premium build quality at an affordable price.</p>",
    "short_description": "<p>Flagship performance at an affordable price.</p>",
    "sku": "OP12001",
    "price": "699.00",
    "regular_price": "699.00",
    "sale_price": "",
    "on_sale": false,
    "purchasable": true,
    "total_sales": 134,
    "categories": [
      {"id": 1, "name": "Electronics", "slug": "electronics"},
      {"id": 2, "name": "Smartphones", "slug": "smartphones"}
    ],
    "images": [
      {
        "id": 1004,
        "src": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=800&fit=crop",
        "name": "OnePlus 12",
        "alt": "OnePlus 12 smartphone"
      }
    ],
    "_links": {
      "self": [{"href": "https://example.com/wp-json/wc/v3/products/1004"}],
      "collection": [{"href": "https://example.com/wp-json/wc/v3/products"}]
    }
  },
  {
    "id": 1005,
    "name": "Xiaomi 14 Ultra",
    "slug": "xiaomi-14-ultra",
    "permalink": "https://example.com/product/xiaomi-14-ultra/",
    "date_created": "2024-02-05T16:00:00",
    "date_created_gmt": "2024-02-05T21:00:00",
    "date_modified": "2024-02-05T16:00:00",
    "date_modified_gmt": "2024-02-05T21:00:00",
    "type": "simple",
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "<p>Photography-focused flagship with Leica-tuned cameras and premium design for mobile photography enthusiasts.</p>",
    "short_description": "<p>Photography flagship with Leica cameras.</p>",
    "sku": "XM14U001",
    "price": "799.00",
    "regular_price": "899.00",
    "sale_price": "799.00",
    "on_sale": true,
    "purchasable": true,
    "total_sales": 45,
    "categories": [
      {"id": 1, "name": "Electronics", "slug": "electronics"},
      {"id": 2, "name": "Smartphones", "slug": "smartphones"}
    ],
    "images": [
      {
        "id": 1005,
        "src": "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&h=800&fit=crop",
        "name": "Xiaomi 14 Ultra",
        "alt": "Xiaomi 14 Ultra"
      }
    ],
    "_links": {
      "self": [{"href": "https://example.com/wp-json/wc/v3/products/1005"}],
      "collection": [{"href": "https://example.com/wp-json/wc/v3/products"}]
    }
  },
  {
    "id": 2001,
    "name": "MacBook Pro 16-inch M3",
    "slug": "macbook-pro-16-m3",
    "permalink": "https://example.com/product/macbook-pro-16-m3/",
    "date_created": "2024-01-10T08:30:00",
    "date_created_gmt": "2024-01-10T13:30:00",
    "date_modified": "2024-01-10T08:30:00",
    "date_modified_gmt": "2024-01-10T13:30:00",
    "type": "variable",
    "status": "publish",
    "featured": true,
    "catalog_visibility": "visible",
    "description": "<p>Professional laptop with M3 chip, stunning Liquid Retina XDR display, and all-day battery life for creative professionals.</p>",
    "short_description": "<p>Professional laptop with M3 chip and XDR display.</p>",
    "sku": "MBP16M3001",
    "price": "2499.00",
    "regular_price": "2499.00",
    "sale_price": "",
    "on_sale": false,
    "purchasable": true,
    "total_sales": 78,
    "categories": [
      {"id": 1, "name": "Electronics", "slug": "electronics"},
      {"id": 3, "name": "Laptops", "slug": "laptops"}
    ],
    "images": [
      {
        "id": 2001,
        "src": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
        "name": "MacBook Pro 16-inch",
        "alt": "MacBook Pro 16-inch M3"
      },
      {
        "id": 2001,
        "src": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
        "name": "MacBook Pro 16-inch",
        "alt": "MacBook Pro 16-inch M3"
      },
      {
        "id": 2001,
        "src": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
        "name": "MacBook Pro 16-inch",
        "alt": "MacBook Pro 16-inch M3"
      }
    ],
    "attributes": [
      {
        "id": 3,
        "name": "Memory",
        "options": ["18GB", "36GB", "128GB"]
      },
      {
        "id": 4,
        "name": "Storage",
        "options": ["512GB", "1TB", "2TB", "4TB", "8TB"]
      }
    ],
    "_links": {
      "self": [{"href": "https://example.com/wp-json/wc/v3/products/2001"}],
      "collection": [{"href": "https://example.com/wp-json/wc/v3/products"}]
    }
  },
  {
    "id": 2002,
    "name": "Dell XPS 13 Plus",
    "slug": "dell-xps-13-plus",
    "permalink": "https://example.com/product/dell-xps-13-plus/",
    "date_created": "2024-01-12T10:15:00",
    "date_created_gmt": "2024-01-12T15:15:00",
    "date_modified": "2024-01-12T10:15:00",
    "date_modified_gmt": "2024-01-12T15:15:00",
    "type": "simple",
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "<p>Ultra-portable Windows laptop with 13th Gen Intel Core processors and stunning 4K OLED display option.</p>",
    "short_description": "<p>Ultra-portable with 13th Gen Intel and OLED display.</p>",
    "sku": "DXPS13P001",
    "price": "1299.00",
    "regular_price": "1299.00",
    "sale_price": "",
    "on_sale": false,
    "purchasable": true,
    "total_sales": 92,
    "categories": [
      {"id": 1, "name": "Electronics", "slug": "electronics"},
      {"id": 3, "name": "Laptops", "slug": "laptops"}
    ],
    "images": [
      {
        "id": 2002,
        "src": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop",
        "name": "Dell XPS 13 Plus",
        "alt": "Dell XPS 13 Plus laptop"
      }
    ],
    "_links": {
      "self": [{"href": "https://example.com/wp-json/wc/v3/products/2002"}],
      "collection": [{"href": "https://example.com/wp-json/wc/v3/products"}]
    }
  },
  {
    "id": 2003,
    "name": "ASUS ROG Zephyrus G16",
    "slug": "asus-rog-zephyrus-g16",
    "permalink": "https://example.com/product/asus-rog-zephyrus-g16/",
    "date_created": "2024-01-18T13:45:00",
    "date_created_gmt": "2024-01-18T18:45:00",
    "date_modified": "2024-01-18T13:45:00",
    "date_modified_gmt": "2024-01-18T18:45:00",
    "type": "simple",
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "<p>Gaming laptop with RTX 4080, Intel Core i9, and 240Hz display for ultimate gaming performance.</p>",
    "short_description": "<p>High-performance gaming laptop with RTX 4080.</p>",
    "sku": "ROGZ16001",
    "price": "2199.00",
    "regular_price": "2399.00",
    "sale_price": "2199.00",
    "on_sale": true,
    "purchasable": true,
    "total_sales": 56,
    "categories": [
      {"id": 1, "name": "Electronics", "slug": "electronics"},
      {"id": 3, "name": "Laptops", "slug": "laptops"}
    ],
    "images": [
      {
        "id": 2003,
        "src": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop",
        "name": "ASUS ROG Zephyrus G16",
        "alt": "ASUS ROG gaming laptop"
      }
    ],
    "_links": {
      "self": [{"href": "https://example.com/wp-json/wc/v3/products/2003"}],
      "collection": [{"href": "https://example.com/wp-json/wc/v3/products"}]
    }
  },
  {
    "id": 2004,
    "name": "ThinkPad X1 Carbon Gen 11",
    "slug": "thinkpad-x1-carbon-gen11",
    "permalink": "https://example.com/product/thinkpad-x1-carbon-gen11/",
    "date_created": "2024-01-22T11:30:00",
    "date_created_gmt": "2024-01-22T16:30:00",
    "date_modified": "2024-01-22T11:30:00",
    "date_modified_gmt": "2024-01-22T16:30:00",
    "type": "simple",
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "<p>Business laptop with military-grade durability, excellent keyboard, and enterprise security features.</p>",
    "short_description": "<p>Premium business laptop with military-grade build.</p>",
    "sku": "TPX1C11001",
    "price": "1699.00",
    "regular_price": "1699.00",
    "sale_price": "",
    "on_sale": false,
    "purchasable": true,
    "total_sales": 73,
    "categories": [
      {"id": 1, "name": "Electronics", "slug": "electronics"},
      {"id": 3, "name": "Laptops", "slug": "laptops"}
    ],
    "images": [
      {
        "id": 2004,
        "src": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
        "name": "ThinkPad X1 Carbon",
        "alt": "Lenovo ThinkPad X1 Carbon"
      }
    ],
    "_links": {
      "self": [{"href": "https://example.com/wp-json/wc/v3/products/2004"}],
      "collection": [{"href": "https://example.com/wp-json/wc/v3/products"}]
    }
  },
  {
    "id": 2005,
    "name": "HP Spectre x360 14",
    "slug": "hp-spectre-x360-14",
    "permalink": "https://example.com/product/hp-spectre-x360-14/",
    "date_created": "2024-01-28T15:20:00",
    "date_created_gmt": "2024-01-28T20:20:00",
    "date_modified": "2024-01-28T15:20:00",
    "date_modified_gmt": "2024-01-28T20:20:00",
    "type": "simple",
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "<p>2-in-1 convertible laptop with OLED touchscreen, stylus support, and premium design for creative professionals.</p>",
    "short_description": "<p>2-in-1 convertible with OLED touchscreen and stylus.</p>",
    "sku": "HPSX36014001",
    "price": "1399.00",
    "regular_price": "1399.00",
    "sale_price": "",
    "on_sale": false,
    "purchasable": true,
    "total_sales": 64,
    "categories": [
      {"id": 1, "name": "Electronics", "slug": "electronics"},
      {"id": 3, "name": "Laptops", "slug": "laptops"}
    ],
    "images": [
      {
        "id": 2005,
        "src": "https://images.unsplash.com/photo-1587614387466-0b20e4047c4c?w=800&h=600&fit=crop",
        "name": "HP Spectre x360 14",
        "alt": "HP Spectre x360 convertible laptop"
      }
    ],
    "_links": {
      "self": [{"href": "https://example.com/wp-json/wc/v3/products/2005"}],
      "collection": [{"href": "https://example.com/wp-json/wc/v3/products"}]
    }
  },
  {
    "id": 3001,
    "name": "Classic Cotton T-Shirt",
    "slug": "classic-cotton-tshirt",
    "permalink": "https://example.com/product/classic-cotton-tshirt/",
    "date_created": "2024-01-05T09:00:00",
    "date_created_gmt": "2024-01-05T14:00:00",
    "date_modified": "2024-01-05T09:00:00",
    "date_modified_gmt": "2024-01-05T14:00:00",
    "type": "variable",
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "<p>Premium 100% cotton t-shirt with comfortable fit and durable construction. Perfect for everyday wear.</p>",
    "short_description": "<p>Premium 100% cotton t-shirt for everyday comfort.</p>",
    "sku": "CCT001",
    "price": "24.99",
    "regular_price": "24.99",
    "sale_price": "",
    "on_sale": false,
    "purchasable": true,
    "total_sales": 245,
    "categories": [
      {"id": 4, "name": "Clothing", "slug": "clothing"},
      {"id": 5, "name": "Men's Clothing", "slug": "mens-clothing"}
    ],
    "images": [
      {
        "id": 3001,
        "src": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
        "name": "Classic Cotton T-Shirt",
        "alt": "Men's cotton t-shirt"
      }
    ],
    "attributes": [
      {
        "id": 5,
        "name": "Size",
        "options": ["XS", "S", "M", "L", "XL", "XXL"]
      },
      {
        "id": 6,
        "name": "Color",
        "options": ["White", "Black", "Navy", "Gray", "Red"]
      }
    ],
    "_links": {
      "self": [{"href": "https://example.com/wp-json/wc/v3/products/3001"}],
      "collection": [{"href": "https://example.com/wp-json/wc/v3/products"}]
    }
  },
  {
    "id": 3002,
    "name": "Slim Fit Jeans",
    "slug": "slim-fit-jeans",
    "permalink": "https://example.com/product/slim-fit-jeans/",
    "date_created": "2024-01-08T12:30:00",
    "date_created_gmt": "2024-01-08T17:30:00",
    "date_modified": "2024-01-08T12:30:00",
    "date_modified_gmt": "2024-01-08T17:30:00",
    "type": "variable",
    "status": "publish",
    "featured": true,
    "catalog_visibility": "visible",
    "description": "<p>Modern slim-fit jeans with stretch denim for comfort and style. Perfect for casual and semi-formal occasions.</p>",
    "short_description": "<p>Modern slim-fit jeans with stretch comfort.</p>",
    "sku": "SFJ001",
    "price": "79.99",
    "regular_price": "89.99",
    "sale_price": "79.99",
    "on_sale": true,
    "purchasable": true,
    "total_sales": 189,
    "categories": [
      {"id": 4, "name": "Clothing", "slug": "clothing"},
      {"id": 5, "name": "Men's Clothing", "slug": "mens-clothing"}
    ],
    "images": [
      {
        "id": 3002,
        "src": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop",
        "name": "Slim Fit Jeans",
        "alt": "Men's slim fit jeans"
      }
    ],
    "attributes": [
      {
        "id": 7,
        "name": "Waist Size",
        "options": ["28", "30", "32", "34", "36", "38", "40"]
      },
      {
        "id": 8,
        "name": "Length",
        "options": ["30", "32", "34", "36"]
      }
    ],
    "_links": {
      "self": [{"href": "https://example.com/wp-json/wc/v3/products/3002"}],
      "collection": [{"href": "https://example.com/wp-json/wc/v3/products"}]
    }
  },
  {
    "id": 3003,
    "name": "Casual Button-Down Shirt",
    "slug": "casual-button-down-shirt",
    "permalink": "https://example.com/product/casual-button-down-shirt/",
    "date_created": "2024-01-12T14:45:00",
    "date_created_gmt": "2024-01-12T19:45:00",
    "date_modified": "2024-01-12T14:45:00",
    "date_modified_gmt": "2024-01-12T19:45:00",
    "type": "variable",
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "<p>Versatile button-down shirt in soft cotton blend. Great for office wear or weekend outings.</p>",
    "short_description": "<p>Versatile cotton blend button-down shirt.</p>",
    "sku": "CBDS001",
    "price": "49.99",
    "regular_price": "49.99",
    "sale_price": "",
    "on_sale": false,
    "purchasable": true,
    "total_sales": 156,
    "categories": [
      {"id": 4, "name": "Clothing", "slug": "clothing"},
      {"id": 5, "name": "Men's Clothing", "slug": "mens-clothing"}
    ],
    "images": [
      {
        "id": 3003,
        "src": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=800&fit=crop",
        "name": "Casual Button-Down Shirt",
        "alt": "Men's button-down shirt"
      }
    ],
    "attributes": [
      {
        "id": 5,
        "name": "Size",
        "options": ["S", "M", "L", "XL", "XXL"]
      },
      {
        "id": 6,
        "name": "Color",
        "options": ["White", "Light Blue", "Navy", "Gray", "Green"]
      }
    ],
    "_links": {
      "self": [{"href": "https://example.com/wp-json/wc/v3/products/3003"}],
      "collection": [{"href": "https://example.com/wp-json/wc/v3/products"}]
    }
  }]

export const mockVariations: Record<number, Variation[]> = {
  1: [
    {
      id: 101,
      date_created: "2023-01-15T10:00:00",
      date_created_gmt: "2023-01-15T10:00:00",
      date_modified: "2023-01-15T10:00:00",
      date_modified_gmt: "2023-01-15T10:00:00",
      description: "Blue S size t-shirt",
      permalink: "/product/classic-t-shirt-blue-s",
      sku: "TS-001-BLUE-S",
      price: "19.99",
      regular_price: "24.99",
      sale_price: "19.99",
      date_on_sale_from: null,
      date_on_sale_from_gmt: null,
      date_on_sale_to: null,
      date_on_sale_to_gmt: null,
      on_sale: true,
      status: "publish",
      purchasable: true,
      virtual: false,
      downloadable: false,
      downloads: [],
      download_limit: 0,
      download_expiry: 0,
      tax_status: "taxable",
      tax_class: "",
      manage_stock: true,
      stock_quantity: 25,
      stock_status: "instock",
      backorders: "no",
      backorders_allowed: false,
      backordered: false,
      weight: "0.2",
      dimensions: {
        length: "10",
        width: "8",
        height: "1",
      },
      shipping_class: "",
      shipping_class_id: 0,
      image: {
        id: 101,
        date_created: "2023-01-15T10:00:00",
        date_created_gmt: "2023-01-15T10:00:00",
        date_modified: "2023-01-15T10:00:00",
        date_modified_gmt: "2023-01-15T10:00:00",
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
        name: "Classic T-Shirt Blue S",
        alt: "Blue classic t-shirt size S",
      },
      attributes: [
        {
          id: 1,
          name: "Color",
          option: "Blue",
        },
        {
          id: 2,
          name: "Size",
          option: "S",
        },
      ],
      menu_order: 0,
      meta_data: [],
      
    },
    {
      id: 102,
      date_created: "2023-01-15T10:00:00",
      date_created_gmt: "2023-01-15T10:00:00",
      date_modified: "2023-01-15T10:00:00",
      date_modified_gmt: "2023-01-15T10:00:00",
      description: "Black M size t-shirt",
      permalink: "/product/classic-t-shirt-black-m",
      sku: "TS-001-BLACK-M",
      price: "19.99",
      regular_price: "24.99",
      sale_price: "19.99",
      date_on_sale_from: null,
      date_on_sale_from_gmt: null,
      date_on_sale_to: null,
      date_on_sale_to_gmt: null,
      on_sale: true,
      status: "publish",
      purchasable: true,
      virtual: false,
      downloadable: false,
      downloads: [],
      download_limit: 0,
      download_expiry: 0,
      tax_status: "taxable",
      tax_class: "",
      manage_stock: true,
      stock_quantity: 30,
      stock_status: "instock",
      backorders: "no",
      backorders_allowed: false,
      backordered: false,
      weight: "0.2",
      dimensions: {
        length: "10",
        width: "8",
        height: "1",
      },
      shipping_class: "",
      shipping_class_id: 0,
      image: {
        id: 102,
        date_created: "2023-01-15T10:00:00",
        date_created_gmt: "2023-01-15T10:00:00",
        date_modified: "2023-01-15T10:00:00",
        date_modified_gmt: "2023-01-15T10:00:00",
        src: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
        name: "Classic T-Shirt Black M",
        alt: "Black classic t-shirt size M",
      },
      attributes: [
        {
          id: 1,
          name: "Color",
          option: "Black",
        },
        {
          id: 2,
          name: "Size",
          option: "M",
        },
      ],
      menu_order: 0,
      meta_data: [],
      
    },
  ],
  2: [
    {
      id: 201,
      date_created: "2023-01-20T11:00:00",
      date_created_gmt: "2023-01-20T11:00:00",
      date_modified: "2023-01-20T11:00:00",
      date_modified_gmt: "2023-01-20T11:00:00",
      description: "Gray L size hoodie",
      permalink: "/product/premium-hoodie-gray-l",
      sku: "HD-001-GRAY-L",
      price: "39.99",
      regular_price: "49.99",
      sale_price: "39.99",
      date_on_sale_from: null,
      date_on_sale_from_gmt: null,
      date_on_sale_to: null,
      date_on_sale_to_gmt: null,
      on_sale: true,
      status: "publish",
      purchasable: true,
      virtual: false,
      downloadable: false,
      downloads: [],
      download_limit: 0,
      download_expiry: 0,
      tax_status: "taxable",
      tax_class: "",
      manage_stock: true,
      stock_quantity: 20,
      stock_status: "instock",
      backorders: "no",
      backorders_allowed: false,
      backordered: false,
      weight: "0.5",
      dimensions: {
        length: "12",
        width: "10",
        height: "2",
      },
      shipping_class: "",
      shipping_class_id: 0,
      image: {
        id: 201,
        date_created: "2023-01-20T11:00:00",
        date_created_gmt: "2023-01-20T11:00:00",
        date_modified: "2023-01-20T11:00:00",
        date_modified_gmt: "2023-01-20T11:00:00",
        src: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9vZGllfGVufDB8fDB8fHww",
        name: "Premium Hoodie Gray L",
        alt: "Gray premium hoodie size L",
      },
      attributes: [
        {
          id: 1,
          name: "Color",
          option: "Gray",
        },
        {
          id: 2,
          name: "Size",
          option: "L",
        },
      ],
      menu_order: 0,
      meta_data: [],
      
    },
    {
      id: 202,
      date_created: "2023-01-20T11:00:00",
      date_created_gmt: "2023-01-20T11:00:00",
      date_modified: "2023-01-20T11:00:00",
      date_modified_gmt: "2023-01-20T11:00:00",
      description: "Black XL size hoodie",
      permalink: "/product/premium-hoodie-black-xl",
      sku: "HD-001-BLACK-XL",
      price: "39.99",
      regular_price: "49.99",
      sale_price: "39.99",
      date_on_sale_from: null,
      date_on_sale_from_gmt: null,
      date_on_sale_to: null,
      date_on_sale_to_gmt: null,
      on_sale: true,
      status: "publish",
      purchasable: true,
      virtual: false,
      downloadable: false,
      downloads: [],
      download_limit: 0,
      download_expiry: 0,
      tax_status: "taxable",
      tax_class: "",
      manage_stock: true,
      stock_quantity: 15,
      stock_status: "instock",
      backorders: "no",
      backorders_allowed: false,
      backordered: false,
      weight: "0.5",
      dimensions: {
        length: "12",
        width: "10",
        height: "2",
      },
      shipping_class: "",
      shipping_class_id: 0,
      image: {
        id: 202,
        date_created: "2023-01-20T11:00:00",
        date_created_gmt: "2023-01-20T11:00:00",
        date_modified: "2023-01-20T11:00:00",
        date_modified_gmt: "2023-01-20T11:00:00",
        src: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9vZGllfGVufDB8fDB8fHww",
        name: "Premium Hoodie Black XL",
        alt: "Black premium hoodie size XL",
      },
      attributes: [
        {
          id: 1,
          name: "Color",
          option: "Black",
        },
        {
          id: 2,
          name: "Size",
          option: "XL",
        },
      ],
      menu_order: 0,
      meta_data: [],
      
    },
  ],
}

export const mockCategories: CategoryItem[] = [
    {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics",
      "parent": 0,
      "description": "Latest electronic devices and accessories",
      "display": "default",
      "image": 
        {
          "id": 101,
          "src": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop",
          "name": "electronics-category.jpg",
          "alt": "Electronics category banner"
        }
      ,
      "menu_order": 1,
      "count": 42,
      
    },
    {
      "id": 2,
      "name": "Smartphones",
      "slug": "smartphones",
      "parent": 1,
      "description": "Latest smartphones and mobile devices",
      "display": "default",
      "image": 
        {
          "id": 102,
          "src": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop",
          "name": "smartphones-category.jpg",
          "alt": "Smartphones category banner"
        }
      ,
      "menu_order": 1,
      "count": 18,
      
    },
    {
      "id": 3,
      "name": "Laptops",
      "slug": "laptops",
      "parent": 1,
      "description": "High-performance laptops for work and gaming",
      "display": "default",
      "image": 
        {
          "id": 103,
          "src": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
          "name": "laptops-category.jpg",
          "alt": "Laptops category banner"
        }
      ,
      "menu_order": 2,
      "count": 15,
     
    },
    {
      "id": 4,
      "name": "Clothing",
      "slug": "clothing",
      "parent": 0,
      "description": "Fashion and apparel for all occasions",
      "display": "default",
      "image": 
        {
          "id": 104,
          "src": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
          "name": "clothing-category.jpg",
          "alt": "Clothing category banner"
        }
      ,
      "menu_order": 2,
      "count": 89,
     
    },
    {
      "id": 5,
      "name": "Men's Clothing",
      "slug": "mens-clothing",
      "parent": 4,
      "description": "Stylish clothing for men",
      "display": "default",
      "image": 
        {
          "id": 105,
          "src": "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&h=600&fit=crop",
          "name": "mens-clothing-category.jpg",
          "alt": "Men's clothing category banner"
        }
      ,
      "menu_order": 1,
      "count": 34,
      
    },
    {
      "id": 6,
      "name": "Women's Clothing",
      "slug": "womens-clothing",
      "parent": 4,
      "description": "Fashionable clothing for women",
      "display": "default",
      "image": 
        {
          "id": 106,
          "src": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=600&fit=crop",
          "name": "womens-clothing-category.jpg",
          "alt": "Women's clothing category banner"
        }
      ,
      "menu_order": 2,
      "count": 55,
      
    },
    {
      "id": 7,
      "name": "Home & Garden",
      "slug": "home-garden",
      "parent": 0,
      "description": "Everything for your home and garden needs",
      "display": "default",
      "image": 
        {
          "id": 107,
          "src": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
          "name": "home-garden-category.jpg",
          "alt": "Home and garden category banner"
        }
      ,
      "menu_order": 3,
      "count": 67,
     
    },
    {
      "id": 8,
      "name": "Furniture",
      "slug": "furniture",
      "parent": 7,
      "description": "Stylish furniture for every room",
      "display": "default",
      "image": 
        {
          "id": 108,
          "src": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
          "name": "furniture-category.jpg",
          "alt": "Furniture category banner"
        }
      ,
      "menu_order": 1,
      "count": 28,
      
    },
    {
      "id": 9,
      "name": "Books",
      "slug": "books",
      "parent": 0,
      "description": "Wide selection of books across all genres",
      "display": "default",
      "image": 
        {
          "id": 109,
          "src": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
          "name": "books-category.jpg",
          "alt": "Books category banner"
        }
      ,
      "menu_order": 4,
      "count": 156,
      
    },
    {
      "id": 10,
      "name": "Fiction",
      "slug": "fiction",
      "parent": 9,
      "description": "Bestselling fiction books and novels",
      "display": "default",
      "image": 
        {
          "id": 110,
          "src": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop",
          "name": "fiction-category.jpg",
          "alt": "Fiction books category banner"
        }
      ,
      "menu_order": 1,
      "count": 87,
      
    },
    {
      "id": 11,
      "name": "Sports & Outdoors",
      "slug": "sports-outdoors",
      "parent": 0,
      "description": "Equipment and gear for sports and outdoor activities",
      "display": "default",
      "image": 
        {
          "id": 111,
          "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
          "name": "sports-outdoors-category.jpg",
          "alt": "Sports and outdoors category banner"
        }
      ,
      "menu_order": 5,
      "count": 73,
      
    },
    {
      "id": 12,
      "name": "Fitness Equipment",
      "slug": "fitness-equipment",
      "parent": 11,
      "description": "Home and gym fitness equipment",
      "display": "default",
      "image": 
        {
          "id": 112,
          "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
          "name": "fitness-equipment-category.jpg",
          "alt": "Fitness equipment category banner"
        }
      ,
      "menu_order": 1,
      "count": 25,
      
    },
    {
      "id": 13,
      "name": "Beauty & Health",
      "slug": "beauty-health",
      "parent": 0,
      "description": "Beauty products and health supplements",
      "display": "default",
      "image": 
        {
          "id": 113,
          "src": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop",
          "name": "beauty-health-category.jpg",
          "alt": "Beauty and health category banner"
        }
      ,
      "menu_order": 6,
      "count": 94,
      
    },
    {
      "id": 14,
      "name": "Skincare",
      "slug": "skincare",
      "parent": 13,
      "description": "Premium skincare products for all skin types",
      "display": "default",
      "image": 
        {
          "id": 114,
          "src": "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&h=600&fit=crop",
          "name": "skincare-category.jpg",
          "alt": "Skincare category banner"
        }
      ,
      "menu_order": 1,
      "count": 47,
      
    },
    {
      "id": 15,
      "name": "Toys & Games",
      "slug": "toys-games",
      "parent": 0,
      "description": "Fun toys and games for all ages",
      "display": "default",
      "image": 
        {
          "id": 115,
          "src": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
          "name": "toys-games-category.jpg",
          "alt": "Toys and games category banner"
        }
      ,
      "menu_order": 7,
      "count": 112,
      
    }
  ]