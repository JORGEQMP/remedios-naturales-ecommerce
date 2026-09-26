import Link from "next/link"
import { XCircle, ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutCancelPage() {
  return (
    <div className="container max-w-lg py-12">
      <Card className="text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Pago cancelado</CardTitle>
          <CardDescription>
            Tu pago ha sido cancelado. No se ha realizado ningun cargo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              Los productos siguen en tu carrito. Puedes intentar nuevamente cuando lo desees.
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/cart">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Volver al carrito
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Seguir comprando
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
