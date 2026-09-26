import { brands } from "@/data/mock-products"

export function BrandSection() {
  return (
    <section className="py-12 sm:py-16 border-t">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Marcas que Confiamos</h2>
          <p className="mt-2 text-muted-foreground">
            Trabajamos con las mejores marcas del mercado
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
          {brands.slice(0, 8).map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
