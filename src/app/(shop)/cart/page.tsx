"use client"

import Link from "next/link"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartItem } from "@/components/cart/CartItem"
import { CartSummary } from "@/components/cart/CartSummary"
import { useCartStore } from "@/stores/cart-store"

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore()

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity)
  }

  const handleRemove = (productId: string) => {
    removeItem(productId)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Tu carrito esta vacio</h1>
          <p className="mt-2 text-muted-foreground">
            Parece que aun no has agregado productos a tu carrito.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">Explorar Productos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Carrito de Compras</h1>
          <p className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "producto" : "productos"} en tu carrito
          </p>
        </div>
        <Button variant="ghost" asChild className="hidden sm:flex">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Seguir Comprando
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card">
            <div className="p-4 sm:p-6">
              <div className="divide-y">
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Continue Shopping - Mobile */}
          <Button variant="outline" asChild className="mt-4 w-full sm:hidden">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Seguir Comprando
            </Link>
          </Button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <CartSummary items={items} />
          </div>
        </div>
      </div>
    </div>
  )
}
