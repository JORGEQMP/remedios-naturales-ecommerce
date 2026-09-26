"use client"

import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FilterSidebar } from "./FilterSidebar"
import { FilterState } from "@/types"

interface FilterMobileProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  activeFilterCount: number
}

export function FilterMobile({
  filters,
  onFiltersChange,
  activeFilterCount,
}: FilterMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filtros
          {activeFilterCount > 0 && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FilterSidebar filters={filters} onFiltersChange={onFiltersChange} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
