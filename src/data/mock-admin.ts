export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "customer"
  status: "active" | "inactive" | "suspended"
  createdAt: string
  orders: number
  totalSpent: number
}

export interface Payment {
  id: string
  orderId: string
  userId: string
  userName: string
  amount: number
  method: "card" | "transfer" | "wallet"
  status: "completed" | "pending" | "failed" | "refunded"
  createdAt: string
}

export interface Order {
  id: string
  userId: string
  userName: string
  items: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
}

export const users: User[] = [
  {
    id: "1",
    name: "Juan Perez",
    email: "juan@email.com",
    role: "customer",
    status: "active",
    createdAt: "2024-01-15",
    orders: 5,
    totalSpent: 1250.00,
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@email.com",
    role: "customer",
    status: "active",
    createdAt: "2024-02-20",
    orders: 3,
    totalSpent: 890.50,
  },
  {
    id: "3",
    name: "Carlos Rodriguez",
    email: "carlos@email.com",
    role: "customer",
    status: "inactive",
    createdAt: "2024-01-10",
    orders: 1,
    totalSpent: 299.99,
  },
  {
    id: "4",
    name: "Ana Martinez",
    email: "ana@email.com",
    role: "admin",
    status: "active",
    createdAt: "2023-12-01",
    orders: 0,
    totalSpent: 0,
  },
  {
    id: "5",
    name: "Luis Sanchez",
    email: "luis@email.com",
    role: "customer",
    status: "suspended",
    createdAt: "2024-03-05",
    orders: 2,
    totalSpent: 450.00,
  },
  {
    id: "6",
    name: "Carmen Lopez",
    email: "carmen@email.com",
    role: "customer",
    status: "active",
    createdAt: "2024-03-10",
    orders: 8,
    totalSpent: 2100.75,
  },
  {
    id: "7",
    name: "Pedro Diaz",
    email: "pedro@email.com",
    role: "customer",
    status: "active",
    createdAt: "2024-02-28",
    orders: 4,
    totalSpent: 980.00,
  },
  {
    id: "8",
    name: "Sofia Torres",
    email: "sofia@email.com",
    role: "customer",
    status: "active",
    createdAt: "2024-03-15",
    orders: 2,
    totalSpent: 560.25,
  },
]

export const payments: Payment[] = [
  {
    id: "PAY-001",
    orderId: "ORD-001",
    userId: "1",
    userName: "Juan Perez",
    amount: 1299.99,
    method: "card",
    status: "completed",
    createdAt: "2024-03-20 14:30",
  },
  {
    id: "PAY-002",
    orderId: "ORD-002",
    userId: "2",
    userName: "Maria Garcia",
    amount: 459.99,
    method: "wallet",
    status: "completed",
    createdAt: "2024-03-20 12:15",
  },
  {
    id: "PAY-003",
    orderId: "ORD-003",
    userId: "6",
    userName: "Carmen Lopez",
    amount: 189.99,
    method: "transfer",
    status: "pending",
    createdAt: "2024-03-20 10:45",
  },
  {
    id: "PAY-004",
    orderId: "ORD-004",
    userId: "7",
    userName: "Pedro Diaz",
    amount: 799.99,
    method: "card",
    status: "failed",
    createdAt: "2024-03-19 18:20",
  },
  {
    id: "PAY-005",
    orderId: "ORD-005",
    userId: "8",
    userName: "Sofia Torres",
    amount: 299.99,
    method: "card",
    status: "completed",
    createdAt: "2024-03-19 15:10",
  },
  {
    id: "PAY-006",
    orderId: "ORD-006",
    userId: "1",
    userName: "Juan Perez",
    amount: 549.99,
    method: "wallet",
    status: "refunded",
    createdAt: "2024-03-18 09:30",
  },
  {
    id: "PAY-007",
    orderId: "ORD-007",
    userId: "6",
    userName: "Carmen Lopez",
    amount: 1899.99,
    method: "card",
    status: "completed",
    createdAt: "2024-03-17 16:45",
  },
  {
    id: "PAY-008",
    orderId: "ORD-008",
    userId: "2",
    userName: "Maria Garcia",
    amount: 129.99,
    method: "transfer",
    status: "pending",
    createdAt: "2024-03-17 11:20",
  },
]

export const orders: Order[] = [
  {
    id: "ORD-001",
    userId: "1",
    userName: "Juan Perez",
    items: 2,
    total: 1299.99,
    status: "delivered",
    createdAt: "2024-03-20",
  },
  {
    id: "ORD-002",
    userId: "2",
    userName: "Maria Garcia",
    items: 1,
    total: 459.99,
    status: "shipped",
    createdAt: "2024-03-20",
  },
  {
    id: "ORD-003",
    userId: "6",
    userName: "Carmen Lopez",
    items: 3,
    total: 189.99,
    status: "processing",
    createdAt: "2024-03-20",
  },
  {
    id: "ORD-004",
    userId: "7",
    userName: "Pedro Diaz",
    items: 1,
    total: 799.99,
    status: "pending",
    createdAt: "2024-03-19",
  },
  {
    id: "ORD-005",
    userId: "8",
    userName: "Sofia Torres",
    items: 2,
    total: 299.99,
    status: "delivered",
    createdAt: "2024-03-19",
  },
]

export const dashboardStats = {
  totalRevenue: 45231.89,
  revenueChange: 20.1,
  totalOrders: 2350,
  ordersChange: 15.2,
  totalCustomers: 1247,
  customersChange: 8.5,
  totalProducts: 184,
  productsChange: 12.3,
}

export const recentSales = [
  { name: "Juan Perez", email: "juan@email.com", amount: 1299.99 },
  { name: "Maria Garcia", email: "maria@email.com", amount: 459.99 },
  { name: "Carmen Lopez", email: "carmen@email.com", amount: 189.99 },
  { name: "Pedro Diaz", email: "pedro@email.com", amount: 799.99 },
  { name: "Sofia Torres", email: "sofia@email.com", amount: 299.99 },
]
