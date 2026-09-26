"use client"

import { Suspense, useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FilterSidebar } from "@/components/products/FilterSidebar"
import { FilterMobile } from "@/components/products/FilterMobile"
import { ProductGrid } from "@/components/products/ProductGrid"
import { SortSelect } from "@/components/products/SortSelect"
import { Skeleton } from "@/components/ui/skeleton"
import { useProductsStore } from "@/stores/products-store"
import { FilterState } from "@/types"

function ProductsContent() {
  const searchParams = useSearchParams()
  const { products, loading, filters, setFilters, fetchProducts, fetchCategories, fetchBrands } = useProductsStore()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")

    const initialFilters: Partial<FilterState> = {}
    if (category) {
      initialFilters.categories = [category]
    }
    if (featured === "true") {
      // This will be handled in the API call
    }

    if (Object.keys(initialFilters).length > 0) {
      setFilters(initialFilters)
    }

    fetchCategories()
    fetchBrands()
  }, [searchParams, setFilters, fetchCategories, fetchBrands])

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts()
  }, [filters, fetchProducts])

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [setFilters])

  const activeFilterCount =
    filters.brands.length +
    filters.categories.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0)

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Productos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Results count and controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Todos los Productos</h1>
          <p className="text-sm text-muted-foreground">
            {loading ? "Cargando..." : `${products.length} productos encontrados`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <FilterMobile
            filters={filters}
            onFiltersChange={handleFiltersChange}
            activeFilterCount={activeFilterCount}
          />
          <SortSelect
            value={filters.sortBy}
            onChange={(sortBy) =>
              setFilters({ sortBy: sortBy as FilterState["sortBy"] })
            }
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-8">
        {/* Sidebar - Desktop */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <FilterSidebar filters={filters} onFiltersChange={handleFiltersChange} />
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <ProductGrid
            products={products}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

function ProductsPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Skeleton className="mb-6 h-6 w-48" />
      <div className="mb-6 flex justify-between">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-32" />
        </div>
      </div>
      <div className="flex gap-8">
        <aside className="hidden w-64 lg:block">
          <Skeleton className="h-96" />
        </aside>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsContent />
    </Suspense>
  )
}
