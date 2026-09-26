"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SortSelectProps {
  value: string
  onChange: (value: string) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popular">Popular</SelectItem>
        <SelectItem value="newest">Mas nuevos</SelectItem>
        <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
        <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
        <SelectItem value="rating">Mejor valorados</SelectItem>
      </SelectContent>
    </Select>
  )
}
