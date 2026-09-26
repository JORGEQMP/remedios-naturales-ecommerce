"use client"

import { useEffect } from "react"
import Link from "next/link"
import { DollarSign, ShoppingCart, Users, Package, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { StatsCard } from "@/components/admin/StatsCard"
import { useAdminStore } from "@/stores/admin-store"

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="mt-1 h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-3 w-32" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const statusLabels: Record<string, string> = {
  delivered: "Entregado",
  shipped: "Enviado",
  processing: "Procesando",
  cancelled: "Cancelado",
  pending: "Pendiente",
}

export default function AdminDashboard() {
  const { stats, recentOrders, loading, fetchDashboard } = useAdminStore()

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  if (loading && !stats) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de administracion de BasicTechShop
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Ingresos Totales"
          value={`S/ ${(stats?.totalRevenue || 0).toLocaleString()}`}
          change={0}
          icon={DollarSign}
        />
        <StatsCard
          title="Pedidos"
          value={(stats?.totalOrders || 0).toLocaleString()}
          change={0}
          icon={ShoppingCart}
        />
        <StatsCard
          title="Clientes"
          value={(stats?.totalCustomers || 0).toLocaleString()}
          change={0}
          icon={Users}
        />
        <StatsCard
          title="Productos"
          value={(stats?.totalProducts || 0).toString()}
          change={0}
          icon={Package}
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pedidos Recientes</CardTitle>
              <CardDescription>Los ultimos pedidos de tu tienda</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/orders">
                Ver todos
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No hay pedidos recientes
              </p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>
                          {order.customer.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.orderNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          order.status === "delivered"
                            ? "default"
                            : order.status === "shipped"
                            ? "secondary"
                            : order.status === "cancelled"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {statusLabels[order.status] || order.status}
                      </Badge>
                      <span className="text-sm font-medium">
                        S/ {order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Status Summary */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Resumen de Pedidos</CardTitle>
            <CardDescription>Estado de los pedidos en tu tienda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Pendientes</span>
                <Badge variant="outline">{useAdminStore.getState().ordersByStatus?.pending || 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Procesando</span>
                <Badge variant="secondary">{useAdminStore.getState().ordersByStatus?.processing || 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Enviados</span>
                <Badge variant="secondary">{useAdminStore.getState().ordersByStatus?.shipped || 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Entregados</span>
                <Badge variant="default">{useAdminStore.getState().ordersByStatus?.delivered || 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cancelados</span>
                <Badge variant="destructive">{useAdminStore.getState().ordersByStatus?.cancelled || 0}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
