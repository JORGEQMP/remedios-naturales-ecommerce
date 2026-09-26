import { create } from "zustand"

interface Address {
  id: string
  label: string
  name: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  orderNumber: string
  status: string
  subtotal: number
  shipping: number
  total: number
  paymentMethod: string
  shippingAddress: string
  items: OrderItem[]
  createdAt: string
}

interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
}

interface AddressInput {
  label: string
  name: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  isDefault?: boolean
}

interface UserState {
  profile: UserProfile | null
  addresses: Address[]
  orders: Order[]
  loading: boolean
  error: string | null
  // Actions
  setProfile: (profile: UserProfile) => void
  fetchAddresses: () => Promise<void>
  fetchOrders: () => Promise<void>
  createAddress: (data: AddressInput) => Promise<Address>
  updateAddress: (id: string, data: AddressInput) => Promise<Address>
  deleteAddress: (id: string) => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  addresses: [],
  orders: [],
  loading: false,
  error: null,

  setProfile: (profile) => set({ profile }),

  fetchAddresses: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("/api/addresses")
      if (!response.ok) throw new Error("Error fetching addresses")
      const addresses = await response.json()
      set({ addresses, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  fetchOrders: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("/api/orders")
      if (!response.ok) throw new Error("Error fetching orders")
      const orders = await response.json()
      set({ orders, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  createAddress: async (data) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Error creating address")
      const address = await response.json()
      set((state) => ({
        addresses: data.isDefault
          ? [
              address,
              ...state.addresses.map((a) => ({ ...a, isDefault: false })),
            ]
          : [...state.addresses, address],
        loading: false,
      }))
      return address
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },

  updateAddress: async (id, data) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/addresses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Error updating address")
      const address = await response.json()
      set((state) => ({
        addresses: state.addresses.map((a) =>
          a.id === id
            ? address
            : data.isDefault
              ? { ...a, isDefault: false }
              : a
        ),
        loading: false,
      }))
      return address
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },

  deleteAddress: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/addresses/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Error deleting address")
      set((state) => ({
        addresses: state.addresses.filter((a) => a.id !== id),
        loading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },
}))
