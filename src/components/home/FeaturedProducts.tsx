"use client"

import { useEffect } from "react"
import { ProductCard } from "@/components/products/ProductCard"
import { useProductsStore } from "@/stores/products-store"
import { Skeleton } from "@/components/ui/skeleton"

export function FeaturedProducts() {
  const { featuredProducts, fetchFeaturedProducts } = useProductsStore()

  useEffect(() => {
    fetchFeaturedProducts()
  }, [fetchFeaturedProducts])

  return (
    <section className="pt-4 pb-12 sm:pt-6 sm:pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.length === 0
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            : featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  )
}
