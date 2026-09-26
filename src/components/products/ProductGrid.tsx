"use client"

import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductCard } from "./ProductCard"
import { Product } from "@/types"

interface ProductGridProps {
  products: Product[]
  viewMode?: "grid" | "list"
  onViewModeChange?: (mode: "grid" | "list") => void
  loading?: boolean
}

export function ProductGrid({
  products,
  viewMode = "grid",
  onViewModeChange,
  loading = false,
}: ProductGridProps) {
  return (
    <div>
      {/* View Mode Toggle */}
      {onViewModeChange && (
        <div className="mb-4 flex justify-end gap-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onViewModeChange("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Vista cuadricula</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onViewModeChange("list")}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">Vista lista</span>
          </Button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col gap-4"
          }
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">No se encontraron productos</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Intenta ajustar los filtros de busqueda
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col gap-4"
          }
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
