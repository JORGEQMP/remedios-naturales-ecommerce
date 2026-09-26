"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { brands } from "@/data/mock-products"

interface BrandFilterProps {
  selectedBrands: string[]
  onBrandsChange: (brands: string[]) => void
}

export function BrandFilter({ selectedBrands, onBrandsChange }: BrandFilterProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleBrandToggle = (brandName: string) => {
    if (selectedBrands.includes(brandName)) {
      onBrandsChange(selectedBrands.filter((b) => b !== brandName))
    } else {
      onBrandsChange([...selectedBrands, brandName])
    }
  }

  return (
    <div className="border-b pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 font-medium"
      >
        Marca
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar marca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>

          <div className="max-h-48 space-y-2 overflow-y-auto">
            {filteredBrands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={selectedBrands.includes(brand.name)}
                  onCheckedChange={() => handleBrandToggle(brand.name)}
                />
                <Label
                  htmlFor={`brand-${brand.id}`}
                  className="flex flex-1 cursor-pointer items-center justify-between text-sm"
                >
                  <span>{brand.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {brand.productCount}
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
