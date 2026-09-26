import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  productos: [
    { name: "Computadoras", href: "/products?category=computadoras" },
    { name: "Monitores", href: "/products?category=monitores" },
    { name: "Teclados", href: "/products?category=teclados" },
    { name: "Mouse", href: "/products?category=mouse" },
    { name: "Audifonos", href: "/products?category=audifonos" },
    { name: "Componentes", href: "/products?category=componentes" },
  ],
  empresa: [
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Contacto", href: "/contact" },
    { name: "Blog", href: "/blog" },
    { name: "Trabaja con Nosotros", href: "/careers" },
  ],
  ayuda: [
    { name: "Centro de Ayuda", href: "/help" },
    { name: "Envios y Entregas", href: "/shipping" },
    { name: "Devoluciones", href: "/returns" },
    { name: "Garantia", href: "/warranty" },
    { name: "Preguntas Frecuentes", href: "/faq" },
  ],
  legal: [
    { name: "Terminos y Condiciones", href: "/terms" },
    { name: "Politica de Privacidad", href: "/privacy" },
    { name: "Cookies", href: "/cookies" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">BT</span>
              </div>
              <span className="text-xl font-bold">BasicTechShop</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Tu tienda de tecnologia de confianza. Los mejores productos de computacion a los mejores precios.
            </p>
            <div className="mt-4 flex gap-3">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold">Productos</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.productos.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold">Empresa</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold">Ayuda</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.ayuda.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold">Contacto</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Av. Tecnologia 123, Lima, Peru</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+51 999 888 777</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@basictechshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BasicTechShop. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
