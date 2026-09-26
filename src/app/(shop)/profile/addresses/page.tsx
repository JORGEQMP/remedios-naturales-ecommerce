"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, MapPin, Pencil, Trash2, Check, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useUserStore } from "@/stores/user-store"

function AddressesSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[1, 2].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-3">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-24" />
              <div className="flex gap-1">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function AddressesPage() {
  const { addresses, loading, fetchAddresses, deleteAddress, updateAddress } = useUserStore()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [settingDefault, setSettingDefault] = useState<string | null>(null)

  useEffect(() => {
    fetchAddresses()
  }, [fetchAddresses])

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteAddress(deleteId)
    } finally {
      setDeleting(false)
      setDeleteId(null)
    }
  }

  const handleSetDefault = async (id: string) => {
    setSettingDefault(id)
    try {
      const address = addresses.find((a) => a.id === id)
      if (address) {
        await updateAddress(id, { ...address, isDefault: true })
      }
    } finally {
      setSettingDefault(null)
    }
  }

  if (loading && addresses.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Mis Direcciones</h2>
            <p className="text-muted-foreground">
              Administra tus direcciones de envio
            </p>
          </div>
        </div>
        <AddressesSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Mis Direcciones</h2>
          <p className="text-muted-foreground">
            Administra tus direcciones de envio
          </p>
        </div>
        <Button asChild>
          <Link href="/profile/addresses/new">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Direccion
          </Link>
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold">No tienes direcciones guardadas</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Agrega una direccion para facilitar tus compras
            </p>
            <Button asChild>
              <Link href="/profile/addresses/new">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Direccion
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id} className={address.isDefault ? "border-primary" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{address.label}</CardTitle>
                    {address.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        <Check className="mr-1 h-3 w-3" />
                        Predeterminada
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <Link href={`/profile/addresses/${address.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => setDeleteId(address.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p className="font-medium">{address.name}</p>
                <p className="text-muted-foreground">{address.address}</p>
                <p className="text-muted-foreground">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-muted-foreground">{address.phone}</p>
                {!address.isDefault && (
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs"
                    onClick={() => handleSetDefault(address.id)}
                    disabled={settingDefault === address.id}
                  >
                    {settingDefault === address.id ? (
                      <>
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      "Establecer como predeterminada"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar direccion</AlertDialogTitle>
            <AlertDialogDescription>
              Esta accion no se puede deshacer. La direccion sera eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
