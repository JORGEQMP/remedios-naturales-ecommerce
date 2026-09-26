"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Package, Eye, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useUserStore } from "@/stores/user-store"

const statusConfig = {
  pending: { label: "Pendiente", variant: "secondary" as const },
  processing: { label: "Procesando", variant: "secondary" as const },
  shipped: { label: "Enviado", variant: "secondary" as const },
  delivered: { label: "Entregado", variant: "default" as const },
  cancelled: { label: "Cancelado", variant: "destructive" as const },
}

function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-3">
            <div className="flex justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Skeleton className="h-16 w-16 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function OrdersPage() {
  const { orders, loading, fetchOrders } = useUserStore()

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  if (loading && orders.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Mis Pedidos</h2>
          <p className="text-muted-foreground">
            Historial de todos tus pedidos
          </p>
        </div>
        <OrdersSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Mis Pedidos</h2>
        <p className="text-muted-foreground">
          Historial de todos tus pedidos
        </p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold">No tienes pedidos</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Aun no has realizado ningun pedido
            </p>
            <Button asChild>
              <Link href="/products">Explorar Productos</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending
            return (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-base">{order.orderNumber}</CardTitle>
                      <CardDescription>
                        {new Date(order.createdAt).toLocaleDateString("es-PE", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </CardDescription>
                    </div>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <p className="text-sm">
                            S/ {item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Footer */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Envio: </span>
                        {order.shippingAddress}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Pago: </span>
                        {order.paymentMethod}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">
                        Total: S/ {order.total.toFixed(2)}
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/profile/orders/${order.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Progress for shipped orders */}
                  {(order.status === "processing" || order.status === "shipped") && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Estado del envio</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{
                                width: order.status === "processing" ? "33%" : "66%",
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {order.status === "processing" ? "Preparando" : "En camino"}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
