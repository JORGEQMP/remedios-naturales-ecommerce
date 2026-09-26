import type { Product, Category, Brand } from "@/types"
import type {
  Product as PrismaProduct,
  Category as PrismaCategory,
  Brand as PrismaBrand,
} from "@prisma/client"

type ProductWithRelations = PrismaProduct & {
  category: PrismaCategory
  brand: PrismaBrand
}

type CategoryWithCount = PrismaCategory & {
  _count?: { products: number }
}

type BrandWithCount = PrismaBrand & {
  _count?: { products: number }
}

export function transformProduct(product: ProductWithRelations): Product {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    brand: product.brand.name,
    category: product.category.slug,
    price: Number(product.price),
    originalPrice: product.comparePrice ? Number(product.comparePrice) : undefined,
    images: product.images,
    description: product.description || "",
    specs: (product.specs as Record<string, string>) || {},
    stock: product.stock,
    isNew: product.isNew,
    isFeatured: product.isFeatured,
    rating: 4.5, // Default rating - could be calculated from reviews in the future
  }
}

export function transformCategory(category: CategoryWithCount): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    icon: category.icon || "Package",
    productCount: category._count?.products || 0,
  }
}

export function transformBrand(brand: BrandWithCount): Brand {
  return {
    id: brand.id,
    name: brand.name,
    logo: brand.logo || undefined,
    productCount: brand._count?.products || 0,
  }
}
