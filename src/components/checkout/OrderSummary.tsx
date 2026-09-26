"use client"

import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/types"

interface OrderSummaryProps {
  items: CartItem[]
}

export function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const shipping = subtotal >= 200 ? 0 : 15
  const tax = subtotal * 0.18 // 18% IGV
  const total = subtotal + shipping

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold">Resumen del Pedido</h2>

      {/* Items */}
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="64px"
              />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {item.quantity}
              </span>
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
              <p className="text-xs text-muted-foreground">{item.product.brand}</p>
            </div>
            <p className="text-sm font-medium">
              S/ {(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      {/* Totals */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>S/ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">IGV (18%)</span>
          <span>Incluido</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Envio</span>
          <span>{shipping === 0 ? "Gratis" : `S/ ${shipping.toFixed(2)}`}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span className="text-lg text-primary">S/ {total.toFixed(2)}</span>
      </div>
    </div>
  )
}
