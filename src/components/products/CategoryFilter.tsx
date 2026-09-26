"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { categories } from "@/data/mock-products"

interface CategoryFilterProps {
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
}

export function CategoryFilter({
  selectedCategories,
  onCategoriesChange,
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleCategoryToggle = (categorySlug: string) => {
    if (selectedCategories.includes(categorySlug)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== categorySlug))
    } else {
      onCategoriesChange([...selectedCategories, categorySlug])
    }
  }

  return (
    <div className="border-b pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 font-medium"
      >
        Categoria
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => handleCategoryToggle(category.slug)}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="flex flex-1 cursor-pointer items-center justify-between text-sm"
              >
                <span>{category.name}</span>
                <span className="text-xs text-muted-foreground">
                  {category.productCount}
                </span>
              </Label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
