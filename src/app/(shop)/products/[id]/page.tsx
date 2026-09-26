"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductGallery } from "@/components/products/ProductGallery"
import { ProductDetail } from "@/components/products/ProductDetail"
import { ProductCard } from "@/components/products/ProductCard"
import { Product } from "@/types"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${id}`)

        if (!response.ok) {
          if (response.status === 404) {
            setError("not_found")
          } else {
            throw new Error("Failed to fetch product")
          }
          return
        }

        const data = await response.json()
        setProduct(data)

        // Fetch related products
        const relatedResponse = await fetch(
          `/api/products?category=${data.category}&limit=4`
        )
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json()
          setRelatedProducts(
            relatedData.products.filter((p: Product) => p.id !== data.id).slice(0, 4)
          )
        }
      } catch (err) {
        setError("error")
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Skeleton className="mb-6 h-6 w-64" />
        <div className="grid gap-8 lg:grid-cols-2">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error === "not_found" || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <p className="mt-2 text-muted-foreground">
          El producto que buscas no existe o ha sido eliminado.
        </p>
        <Button asChild className="mt-4">
          <Link href="/products">Ver todos los productos</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button - Mobile */}
      <Button
        variant="ghost"
        asChild
        className="mb-4 -ml-2 sm:hidden"
      >
        <Link href="/products">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Volver
        </Link>
      </Button>

      {/* Breadcrumb - Desktop */}
      <Breadcrumb className="mb-6 hidden sm:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Productos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products?category=${product.category}`}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="max-w-[200px] truncate">
              {product.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />
        <ProductDetail product={product} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Productos Relacionados</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
