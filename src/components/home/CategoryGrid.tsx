"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Monitor, Keyboard, Mouse, Headphones, HardDrive, Cpu, Gamepad2, Package } from "lucide-react"
import { useProductsStore } from "@/stores/products-store"
import { Skeleton } from "@/components/ui/skeleton"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor: Monitor,
  Keyboard: Keyboard,
  Mouse: Mouse,
  Headphones: Headphones,
  HardDrive: HardDrive,
  Cpu: Cpu,
  Gamepad2: Gamepad2,
  Package: Package,
}

export function CategoryGrid() {
  const { categories, fetchCategories } = useProductsStore()

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <section className="pt-6 pb-2 sm:pt-8 sm:pb-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.length === 0
            ? Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-32 rounded-full" />
              ))
            : categories.map((category) => {
                const Icon = iconMap[category.icon] || Package
                return (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{category.name}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground">
                      {category.productCount}
                    </span>
                  </Link>
                )
              })}
        </div>
      </div>
    </section>
  )
}
