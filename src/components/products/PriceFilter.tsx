"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

interface PriceFilterProps {
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  minPrice?: number
  maxPrice?: number
}

export function PriceFilter({
  priceRange,
  onPriceChange,
  minPrice = 0,
  maxPrice = 5000,
}: PriceFilterProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleSliderChange = (values: number[]) => {
    onPriceChange([values[0], values[1]])
  }

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value >= minPrice && value <= priceRange[1]) {
      onPriceChange([value, priceRange[1]])
    }
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value <= maxPrice && value >= priceRange[0]) {
      onPriceChange([priceRange[0], value])
    }
  }

  return (
    <div className="border-b pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 font-medium"
      >
        Precio
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <Slider
            value={[priceRange[0], priceRange[1]]}
            onValueChange={handleSliderChange}
            min={minPrice}
            max={maxPrice}
            step={10}
            className="w-full"
          />

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground">Min</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  S/
                </span>
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={handleMinChange}
                  className="pl-7 h-9 text-sm"
                  min={minPrice}
                  max={priceRange[1]}
                />
              </div>
            </div>
            <span className="mt-4 text-muted-foreground">-</span>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground">Max</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  S/
                </span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={handleMaxChange}
                  className="pl-7 h-9 text-sm"
                  min={priceRange[0]}
                  max={maxPrice}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
