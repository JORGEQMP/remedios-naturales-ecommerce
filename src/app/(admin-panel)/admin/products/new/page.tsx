"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "@/components/admin/ImageUpload"

interface UploadedImage {
  url: string
  publicId: string
}

const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  slug: z.string().min(1, "El slug es requerido"),
  description: z.string().min(1, "La descripcion es requerida"),
  price: z.number().min(0, "El precio debe ser mayor a 0"),
  comparePrice: z.number().optional(),
  stock: z.number().min(0, "El stock debe ser mayor o igual a 0"),
  categoryId: z.string().min(1, "La categoria es requerida"),
  brandId: z.string().min(1, "La marca es requerida"),
  isNew: z.boolean(),
  isFeatured: z.boolean(),
})

type ProductFormData = z.infer<typeof productSchema>

interface Category {
  id: string
  name: string
  slug: string
}

interface Brand {
  id: string
  name: string
  slug: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState<UploadedImage[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isNew: false,
      isFeatured: false,
      stock: 0,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/brands"),
        ])

        const categoriesData = await categoriesRes.json()
        const brandsData = await brandsRes.json()

        setCategories(categoriesData || [])
        setBrands(brandsData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const onSubmit = async (data: ProductFormData) => {
    if (images.length === 0) {
      alert("Debes subir al menos una imagen")
      return
    }

    setSaving(true)
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          images: images.map((img) => img.url),
        }),
      })

      if (!response.ok) throw new Error("Error creating product")

      router.push("/admin/products")
    } catch (error) {
      console.error("Error creating product:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nuevo Producto</h1>
          <p className="text-muted-foreground">
            Agrega un nuevo producto al catalogo
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informacion Basica</CardTitle>
            <CardDescription>
              Datos principales del producto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="Nombre del producto"
                  {...register("name", {
                    onChange: (e) => {
                      setValue("slug", generateSlug(e.target.value))
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  placeholder="nombre-del-producto"
                  {...register("slug")}
                />
                {errors.slug && (
                  <p className="text-sm text-destructive">{errors.slug.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripcion</Label>
              <Textarea
                id="description"
                placeholder="Descripcion detallada del producto"
                rows={4}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Categoria</Label>
                <Select onValueChange={(value) => setValue("categoryId", value)}>
                  <SelectTrigger id="categoryId">
                    <SelectValue placeholder="Seleccionar categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && (
                  <p className="text-sm text-destructive">{errors.categoryId.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="brandId">Marca</Label>
                <Select onValueChange={(value) => setValue("brandId", value)}>
                  <SelectTrigger id="brandId">
                    <SelectValue placeholder="Seleccionar marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.brandId && (
                  <p className="text-sm text-destructive">{errors.brandId.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Precio e Inventario</CardTitle>
            <CardDescription>
              Configura precio y disponibilidad
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Precio (S/)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="comparePrice">Precio anterior (opcional)</Label>
                <Input
                  id="comparePrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("comparePrice", { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  {...register("stock", { valueAsNumber: true })}
                />
                {errors.stock && (
                  <p className="text-sm text-destructive">{errors.stock.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imagenes</CardTitle>
            <CardDescription>
              Sube las imagenes del producto (máximo 5)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              value={images}
              onChange={setImages}
              maxImages={5}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Opciones</CardTitle>
            <CardDescription>
              Configuraciones adicionales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isNew"
                checked={watch("isNew")}
                onCheckedChange={(checked) => setValue("isNew", !!checked)}
              />
              <Label htmlFor="isNew" className="font-normal">
                Marcar como producto nuevo
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFeatured"
                checked={watch("isFeatured")}
                onCheckedChange={(checked) => setValue("isFeatured", !!checked)}
              />
              <Label htmlFor="isFeatured" className="font-normal">
                Mostrar en productos destacados
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/products">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar Producto"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
