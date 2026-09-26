"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUserStore } from "@/stores/user-store"

const addressSchema = z.object({
  label: z.string().min(1, "La etiqueta es requerida"),
  name: z.string().min(1, "El nombre es requerido"),
  phone: z.string().min(1, "El telefono es requerido"),
  address: z.string().min(1, "La direccion es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  state: z.string().min(1, "El departamento es requerido"),
  zipCode: z.string().min(1, "El codigo postal es requerido"),
  isDefault: z.boolean(),
})

type AddressFormData = z.infer<typeof addressSchema>

const departments = [
  "Amazonas", "Ancash", "Apurimac", "Arequipa", "Ayacucho",
  "Cajamarca", "Callao", "Cusco", "Huancavelica", "Huanuco",
  "Ica", "Junin", "La Libertad", "Lambayeque", "Lima",
  "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura",
  "Puno", "San Martin", "Tacna", "Tumbes", "Ucayali",
]

function EditFormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function EditAddressPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { addresses, fetchAddresses, updateAddress } = useUserStore()
  const [saving, setSaving] = useState(false)
  const [loadingAddress, setLoadingAddress] = useState(true)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      isDefault: false,
    },
  })

  useEffect(() => {
    const loadAddress = async () => {
      if (addresses.length === 0) {
        await fetchAddresses()
      }
      setLoadingAddress(false)
    }
    loadAddress()
  }, [addresses.length, fetchAddresses])

  useEffect(() => {
    const address = addresses.find((a) => a.id === id)
    if (address) {
      reset({
        label: address.label,
        name: address.name,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        isDefault: address.isDefault,
      })
    }
  }, [addresses, id, reset])

  const onSubmit = async (data: AddressFormData) => {
    setSaving(true)
    try {
      await updateAddress(id, data)
      router.push("/profile/addresses")
    } catch (error) {
      console.error("Error updating address:", error)
    } finally {
      setSaving(false)
    }
  }

  const address = addresses.find((a) => a.id === id)

  if (loadingAddress) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile/addresses">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-xl font-semibold">Editar Direccion</h2>
            <p className="text-muted-foreground">
              Modifica los datos de tu direccion
            </p>
          </div>
        </div>
        <EditFormSkeleton />
      </div>
    )
  }

  if (!address) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile/addresses">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-xl font-semibold">Direccion no encontrada</h2>
            <p className="text-muted-foreground">
              La direccion que buscas no existe
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile/addresses">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Editar Direccion</h2>
          <p className="text-muted-foreground">
            Modifica los datos de tu direccion
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informacion de la Direccion</CardTitle>
          <CardDescription>
            Actualiza los datos de tu direccion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="label">Etiqueta</Label>
                <Input
                  id="label"
                  placeholder="Ej: Casa, Oficina"
                  {...register("label")}
                />
                {errors.label && (
                  <p className="text-sm text-destructive">{errors.label.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  placeholder="Juan Perez"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefono</Label>
              <Input
                id="phone"
                placeholder="+51 999 888 777"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Direccion</Label>
              <Input
                id="address"
                placeholder="Av. Principal 123"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  placeholder="Lima"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Departamento</Label>
                <Select
                  value={watch("state")}
                  onValueChange={(value) => setValue("state", value)}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-sm text-destructive">{errors.state.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Codigo Postal</Label>
                <Input
                  id="zipCode"
                  placeholder="15001"
                  {...register("zipCode")}
                />
                {errors.zipCode && (
                  <p className="text-sm text-destructive">{errors.zipCode.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDefault"
                checked={watch("isDefault")}
                onCheckedChange={(checked) => setValue("isDefault", !!checked)}
              />
              <Label htmlFor="isDefault" className="font-normal">
                Establecer como direccion predeterminada
              </Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/profile/addresses">Cancelar</Link>
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Guardar Cambios"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
