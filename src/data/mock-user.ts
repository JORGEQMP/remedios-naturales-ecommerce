import { products } from "./mock-products"

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  createdAt: string
}

export interface Address {
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

export interface OrderItem {
  productId: string
  name: string
  brand: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentMethod: string
  shippingAddress: string
  createdAt: string
  updatedAt: string
}

export const userProfile: UserProfile = {
  id: "1",
  name: "Juan Perez",
  email: "juan.perez@email.com",
  phone: "+51 999 888 777",
  createdAt: "2024-01-15",
}

export const addresses: Address[] = [
  {
    id: "1",
    label: "Casa",
    name: "Juan Perez",
    phone: "+51 999 888 777",
    address: "Av. Principal 123, Dpto 401",
    city: "Lima",
    state: "Lima",
    zipCode: "15001",
    isDefault: true,
  },
  {
    id: "2",
    label: "Oficina",
    name: "Juan Perez",
    phone: "+51 999 888 777",
    address: "Jr. Comercio 456, Piso 3",
    city: "Miraflores",
    state: "Lima",
    zipCode: "15074",
    isDefault: false,
  },
]

export const orders: Order[] = [
  {
    id: "ORD-2024-001",
    items: [
      {
        productId: "1",
        name: "ROG Strix GeForce RTX 4080",
        brand: "ASUS",
        price: 1299.99,
        quantity: 1,
        image: products[0].images[0],
      },
    ],
    total: 1299.99,
    status: "delivered",
    paymentMethod: "Tarjeta •••• 3456",
    shippingAddress: "Av. Principal 123, Lima",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-20",
  },
  {
    id: "ORD-2024-002",
    items: [
      {
        productId: "2",
        name: "G Pro X Superlight 2",
        brand: "Logitech",
        price: 159.99,
        quantity: 1,
        image: products[1].images[0],
      },
      {
        productId: "3",
        name: "K100 RGB Mechanical",
        brand: "Corsair",
        price: 229.99,
        quantity: 1,
        image: products[2].images[0],
      },
    ],
    total: 389.98,
    status: "shipped",
    paymentMethod: "Yape",
    shippingAddress: "Jr. Comercio 456, Miraflores",
    createdAt: "2024-03-18",
    updatedAt: "2024-03-19",
  },
  {
    id: "ORD-2024-003",
    items: [
      {
        productId: "5",
        name: "Cloud III Wireless",
        brand: "HyperX",
        price: 169.99,
        quantity: 2,
        image: products[4].images[0],
      },
    ],
    total: 339.98,
    status: "processing",
    paymentMethod: "Transferencia BCP",
    shippingAddress: "Av. Principal 123, Lima",
    createdAt: "2024-03-20",
    updatedAt: "2024-03-20",
  },
  {
    id: "ORD-2024-004",
    items: [
      {
        productId: "6",
        name: "970 EVO Plus 2TB",
        brand: "Samsung",
        price: 189.99,
        quantity: 1,
        image: products[5].images[0],
      },
    ],
    total: 189.99,
    status: "cancelled",
    paymentMethod: "Tarjeta •••• 7890",
    shippingAddress: "Av. Principal 123, Lima",
    createdAt: "2024-03-10",
    updatedAt: "2024-03-11",
  },
]

export const favorites = [products[0], products[1], products[6], products[9]]
