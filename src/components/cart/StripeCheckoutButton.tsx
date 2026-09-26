"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Loader2, CreditCard, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cart-store"

export function StripeCheckoutButton() {
  const [loading, setLoading] = useState(false)
  const items = useCartStore((state) => state.items)
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleCheckout = async () => {
    // Check if user is authenticated
    if (!session) {
      router.push("/login?callbackUrl=/cart")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.images?.[0],
          })),
          customerEmail: session.user?.email,
        }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL returned")
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
      alert("Error al procesar el pago. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const isLoading = loading || status === "loading"

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading || items.length === 0}
      className="w-full"
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Procesando...
        </>
      ) : !session ? (
        <>
          <LogIn className="mr-2 h-4 w-4" />
          Iniciar sesión para pagar
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          Pagar con Stripe
        </>
      )}
    </Button>
  )
}
