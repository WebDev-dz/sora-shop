// lib/cart-store.ts
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface CartItem {
  id: number
  name: string
  price: string
  quantity: number
  image: string
}

interface CartState {
  cart: CartItem[]
  totalPrice: number
  addToCart: (product: any) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      totalPrice: 0,

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.cart.findIndex((item) => item.id === product.id)

          let updatedCart: CartItem[]
          if (existingItemIndex >= 0) {
            // Item already exists, update quantity
            updatedCart = [...state.cart]
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: updatedCart[existingItemIndex].quantity + quantity,
            }
          } else {
            // Add new item
            updatedCart = [
              ...state.cart,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity,
                image: product.images?.[0]?.src || "/placeholder.svg?height=100&width=100",
              },
            ]
          }

          // Calculate total price
          const totalPrice = updatedCart.reduce(
            (sum, item) => sum + Number.parseFloat(item.price) * item.quantity,
            0
          )

          return { cart: updatedCart, totalPrice }
        })
      },

      removeFromCart: (productId) => {
        set((state) => {
          const updatedCart = state.cart.filter((item) => item.id !== productId)
          const totalPrice = updatedCart.reduce(
            (sum, item) => sum + Number.parseFloat(item.price) * item.quantity,
            0
          )
          return { cart: updatedCart, totalPrice }
        })
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            const updatedCart = state.cart.filter((item) => item.id !== productId)
            const totalPrice = updatedCart.reduce(
              (sum, item) => sum + Number.parseFloat(item.price) * item.quantity,
              0
            )
            return { cart: updatedCart, totalPrice }
          }

          const updatedCart = state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
          const totalPrice = updatedCart.reduce(
            (sum, item) => sum + Number.parseFloat(item.price) * item.quantity,
            0
          )
          return { cart: updatedCart, totalPrice }
        })
      },

      clearCart: () => {
        set({ cart: [], totalPrice: 0 })
      },
    }),
    {
      name: "cart-storage", // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
)