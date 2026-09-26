"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Upload, X, Loader2, ImagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UploadedImage {
  url: string
  publicId: string
}

interface ImageUploadProps {
  value: UploadedImage[]
  onChange: (images: UploadedImage[]) => void
  maxImages?: number
}

export function ImageUpload({ value = [], onChange, maxImages = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return

      const remainingSlots = maxImages - value.length
      if (remainingSlots <= 0) return

      const filesToUpload = Array.from(files).slice(0, remainingSlots)
      setUploading(true)

      try {
        const uploadPromises = filesToUpload.map(async (file) => {
          const formData = new FormData()
          formData.append("file", file)

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || "Error al subir imagen")
          }

          return response.json()
        })

        const results = await Promise.all(uploadPromises)
        onChange([...value, ...results])
      } catch (error) {
        console.error("Error uploading images:", error)
      } finally {
        setUploading(false)
      }
    },
    [value, onChange, maxImages]
  )

  const handleRemove = useCallback(
    async (index: number) => {
      const imageToRemove = value[index]

      // Eliminar de Cloudinary
      try {
        await fetch(`/api/upload?publicId=${encodeURIComponent(imageToRemove.publicId)}`, {
          method: "DELETE",
        })
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error)
      }

      // Actualizar estado local
      const newImages = value.filter((_, i) => i !== index)
      onChange(newImages)
    },
    [value, onChange]
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      handleUpload(e.dataTransfer.files)
    },
    [handleUpload]
  )

  return (
    <div className="space-y-4">
      {/* Preview de imágenes subidas */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {value.map((image, index) => (
            <div
              key={image.publicId}
              className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
            >
              <Image
                src={image.url}
                alt={`Imagen ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Área de upload */}
      {value.length < maxImages && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50",
            uploading && "pointer-events-none opacity-50"
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Subiendo...</p>
            </>
          ) : (
            <>
              <ImagePlus className="h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">
                Arrastra imágenes aquí o haz clic para seleccionar
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, WebP o GIF (máx. 5MB)
              </p>
              <p className="text-xs text-muted-foreground">
                {value.length} de {maxImages} imágenes
              </p>
            </>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={(e) => handleUpload(e.target.files)}
            className="absolute inset-0 cursor-pointer opacity-0"
            disabled={uploading}
          />
        </div>
      )}
    </div>
  )
}
