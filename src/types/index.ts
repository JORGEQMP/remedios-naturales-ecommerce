export interface Product {
  id: string
  name: string
  slug: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  images: string[]
  description: string
  specs: Record<string, string>
  stock: number
  isNew: boolean
  isFeatured: boolean
  rating: number
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  productCount: number
}

export interface Brand {
  id: string
  name: string
  logo?: string
  productCount: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: [number, number]
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'newest' | 'rating'
}
