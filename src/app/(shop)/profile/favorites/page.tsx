"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/products/ProductCard"
import { favorites } from "@/data/mock-user"

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Mis Favoritos</h2>
        <p className="text-muted-foreground">
          Productos que has guardado
        </p>
      </div>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold">No tienes favoritos</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Guarda productos que te gusten para verlos luego
            </p>
            <Button asChild>
              <Link href="/products">Explorar Productos</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {favorites.length} {favorites.length === 1 ? "producto" : "productos"} guardados
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
