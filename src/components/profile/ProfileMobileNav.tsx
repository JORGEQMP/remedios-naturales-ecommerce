"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Package, MapPin, Heart, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const navigation = [
  { name: "Perfil", href: "/profile", icon: User },
  { name: "Pedidos", href: "/profile/orders", icon: Package },
  { name: "Direcciones", href: "/profile/addresses", icon: MapPin },
  { name: "Favoritos", href: "/profile/favorites", icon: Heart },
  { name: "Config", href: "/profile/settings", icon: Settings },
]

export function ProfileMobileNav() {
  const pathname = usePathname()

  return (
    <ScrollArea className="w-full lg:hidden">
      <div className="flex gap-2 pb-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
