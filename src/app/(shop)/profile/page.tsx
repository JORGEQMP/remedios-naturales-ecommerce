"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { Camera, Pencil } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useUserStore } from "@/stores/user-store"

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2 text-center sm:text-left">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const { orders, fetchOrders } = useUserStore()

  useEffect(() => {
    if (session?.user) {
      fetchOrders()
    }
  }, [session, fetchOrders])

  if (status === "loading") {
    return <ProfileSkeleton />
  }

  const user = session?.user

  const stats = {
    totalOrders: orders.length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    totalSpent: orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0),
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Pedidos</CardDescription>
            <CardTitle className="text-2xl">{stats.totalOrders}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pedidos Entregados</CardDescription>
            <CardTitle className="text-2xl text-green-600">{stats.delivered}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Gastado</CardDescription>
            <CardTitle className="text-2xl">S/ {stats.totalSpent.toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Personal Info */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Informacion Personal</CardTitle>
            <CardDescription>
              Administra tu informacion personal
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nombre completo</Label>
              <Input value={user?.name || ""} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Correo electronico</Label>
              <Input value={user?.email || ""} readOnly className="bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Seguridad</CardTitle>
          <CardDescription>
            Administra la seguridad de tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Contrasena</p>
              <p className="text-sm text-muted-foreground">
                Cambia tu contrasena regularmente
              </p>
            </div>
            <Button variant="outline">Cambiar</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Autenticacion de dos factores</p>
              <p className="text-sm text-muted-foreground">
                Agrega una capa extra de seguridad
              </p>
            </div>
            <Button variant="outline">Configurar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
