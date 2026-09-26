"use client"

import { Suspense, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCartStore } from "@/stores/cart-store"

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    // Clear cart after successful payment
    clearCart()
  }, [clearCart])

  return (
    <div className="container max-w-lg py-12">
      <Card className="text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Pago exitoso</CardTitle>
          <CardDescription>
            Tu pedido ha sido procesado correctamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center justify-center gap-2 text-sm">
              <Package className="h-4 w-4" />
              <span>Recibiras un email con los detalles de tu pedido</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/profile/orders">
                Ver mis pedidos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/products">
                Seguir comprando
              </Link>
            </Button>
          </div>

          {sessionId && (
            <p className="text-xs text-muted-foreground">
              ID de transaccion: {sessionId.slice(0, 20)}...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function SuccessSkeleton() {
  return (
    <div className="container max-w-lg py-12">
      <Card className="text-center">
        <CardContent className="py-12">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<SuccessSkeleton />}>
      <SuccessContent />
    </Suspense>
  )
}
