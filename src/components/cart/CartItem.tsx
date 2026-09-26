"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartItem as CartItemType } from "@/types"

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item

  return (
    <div className="flex gap-4 py-4">
      {/* Image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{product.brand}</p>
            <Link
              href={`/products/${product.id}`}
              className="font-medium hover:text-primary transition-colors line-clamp-2"
            >
              {product.name}
            </Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          {/* Quantity */}
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-10 text-center text-sm">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-semibold text-primary">
              S/ {(product.price * quantity).toFixed(2)}
            </p>
            {quantity > 1 && (
              <p className="text-xs text-muted-foreground">
                S/ {product.price.toFixed(2)} c/u
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
