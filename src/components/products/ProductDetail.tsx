"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, RotateCcw, ShieldCheck, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Product } from "@/types"
import { useCartStore } from "@/stores/cart-store"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Badges */}
      <div className="flex gap-2">
        {product.isNew && (
          <Badge className="bg-primary text-primary-foreground">Nuevo</Badge>
        )}
        {hasDiscount && <Badge variant="destructive">-{discountPercent}%</Badge>}
      </div>

      {/* Brand */}
      <p className="text-sm text-muted-foreground">{product.brand}</p>

      {/* Name */}
      <h1 className="text-2xl font-bold sm:text-3xl">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{product.rating}</span>
        <span className="text-sm text-muted-foreground">(128 resenas)</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-primary">
          S/ {product.price.toFixed(2)}
        </span>
        {hasDiscount && (
          <span className="text-lg text-muted-foreground line-through">
            S/ {product.originalPrice!.toFixed(2)}
          </span>
        )}
      </div>

      {/* Stock */}
      <p className="text-sm">
        {product.stock > 0 ? (
          <span className="text-green-600 dark:text-green-400">
            {product.stock} unidades disponibles
          </span>
        ) : (
          <span className="text-destructive">Agotado</span>
        )}
      </p>

      <Separator />

      {/* Description */}
      <div>
        <h3 className="font-semibold mb-2">Descripcion</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <Separator />

      {/* Quantity & Add to Cart */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Cantidad:</span>
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-r-none"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center text-sm font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-l-none"
              onClick={increaseQuantity}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Add to Cart */}
        <div className="flex flex-1 gap-2">
          <Button
            className="flex-1"
            size="lg"
            disabled={product.stock === 0 || added}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Agregado
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar al Carrito
              </>
            )}
          </Button>
          <Button variant="outline" size="lg">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Benefits */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Envio gratis</p>
            <p className="text-xs text-muted-foreground">En pedidos +S/ 200</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Devoluciones</p>
            <p className="text-xs text-muted-foreground">30 dias para devolver</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Garantia</p>
            <p className="text-xs text-muted-foreground">1 ano de garantia</p>
          </div>
        </div>
      </div>

      {/* Specs */}
      {Object.keys(product.specs).length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="font-semibold mb-3">Especificaciones</h3>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <dt className="text-muted-foreground">{key}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </>
      )}
    </div>
  )
}
