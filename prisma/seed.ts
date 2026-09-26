import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding database...")

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.address.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.user.deleteMany()

  // Create Categories
  const categoriesData = [
    { name: "Computadoras", slug: "computadoras", icon: "Monitor" },
    { name: "Monitores", slug: "monitores", icon: "Monitor" },
    { name: "Teclados", slug: "teclados", icon: "Keyboard" },
    { name: "Mouse", slug: "mouse", icon: "Mouse" },
    { name: "Audifonos", slug: "audifonos", icon: "Headphones" },
    { name: "Almacenamiento", slug: "almacenamiento", icon: "HardDrive" },
    { name: "Componentes", slug: "componentes", icon: "Cpu" },
  ]

  const categories: Record<string, string> = {}
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat })
    categories[cat.slug] = created.id
  }
  console.log(`Created ${categoriesData.length} categories`)

  // Create Brands
  const brandsData = [
    { name: "ASUS", slug: "asus" },
    { name: "MSI", slug: "msi" },
    { name: "Corsair", slug: "corsair" },
    { name: "Logitech", slug: "logitech" },
    { name: "Razer", slug: "razer" },
    { name: "HyperX", slug: "hyperx" },
    { name: "Kingston", slug: "kingston" },
    { name: "Samsung", slug: "samsung" },
    { name: "LG", slug: "lg" },
    { name: "Dell", slug: "dell" },
    { name: "NVIDIA", slug: "nvidia" },
    { name: "AMD", slug: "amd" },
  ]

  const brands: Record<string, string> = {}
  for (const brand of brandsData) {
    const created = await prisma.brand.create({ data: brand })
    brands[brand.name] = created.id
  }
  console.log(`Created ${brandsData.length} brands`)

  // Create Products
  const productsData = [
    {
      name: "ROG Strix GeForce RTX 4080",
      slug: "rog-strix-rtx-4080",
      brand: "ASUS",
      category: "componentes",
      price: 1299.99,
      comparePrice: 1499.99,
      images: [
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500",
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500",
      ],
      description: "Tarjeta grafica de alto rendimiento con iluminacion RGB y refrigeracion avanzada",
      specs: {
        Memoria: "16GB GDDR6X",
        "Nucleos CUDA": "9728",
        "Reloj Base": "2205 MHz",
        TDP: "320W",
      },
      stock: 5,
      isNew: true,
      isFeatured: true,
    },
    {
      name: "G Pro X Superlight 2",
      slug: "g-pro-x-superlight-2",
      brand: "Logitech",
      category: "mouse",
      price: 159.99,
      images: ["https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"],
      description: "Mouse gaming ultraligero con sensor HERO 2 de 32K DPI",
      specs: {
        Peso: "60g",
        Sensor: "HERO 2",
        DPI: "32,000",
        Bateria: "95 horas",
      },
      stock: 15,
      isNew: true,
      isFeatured: true,
    },
    {
      name: "K100 RGB Mechanical",
      slug: "k100-rgb-mechanical",
      brand: "Corsair",
      category: "teclados",
      price: 229.99,
      comparePrice: 249.99,
      images: ["https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500"],
      description: "Teclado mecanico premium con switches opticos y iCUE RGB",
      specs: {
        Switches: "OPX Optical",
        Retroiluminacion: "RGB por tecla",
        Conexion: "USB-C",
        "Macro Keys": "6",
      },
      stock: 8,
      isNew: false,
      isFeatured: true,
    },
    {
      name: "Odyssey G9 49\"",
      slug: "odyssey-g9-49",
      brand: "Samsung",
      category: "monitores",
      price: 1299.99,
      comparePrice: 1499.99,
      images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"],
      description: "Monitor gaming curvo ultrawide con 240Hz y 1ms de respuesta",
      specs: {
        Resolucion: "5120x1440",
        Panel: "VA Curvo 1000R",
        "Tasa Refresco": "240Hz",
        HDR: "HDR1000",
      },
      stock: 3,
      isNew: false,
      isFeatured: true,
    },
    {
      name: "Cloud III Wireless",
      slug: "cloud-iii-wireless",
      brand: "HyperX",
      category: "audifonos",
      price: 169.99,
      images: ["https://images.unsplash.com/photo-1599669454699-248893623440?w=500"],
      description: "Audifonos gaming inalambricos con sonido espacial DTS:X",
      specs: {
        Driver: "53mm",
        Frecuencia: "10Hz-21kHz",
        Bateria: "120 horas",
        Microfono: "Bidireccional con cancelacion de ruido",
      },
      stock: 12,
      isNew: true,
      isFeatured: false,
    },
    {
      name: "970 EVO Plus 2TB",
      slug: "970-evo-plus-2tb",
      brand: "Samsung",
      category: "almacenamiento",
      price: 189.99,
      images: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500"],
      description: "SSD NVMe M.2 de alta velocidad para gaming y productividad",
      specs: {
        Capacidad: "2TB",
        Lectura: "3,500 MB/s",
        Escritura: "3,300 MB/s",
        Interfaz: "PCIe Gen 3.0 x4",
      },
      stock: 25,
      isNew: false,
      isFeatured: false,
    },
    {
      name: "DeathAdder V3 Pro",
      slug: "deathadder-v3-pro",
      brand: "Razer",
      category: "mouse",
      price: 149.99,
      images: ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500"],
      description: "Mouse ergonomico gaming con sensor Focus Pro 30K",
      specs: {
        Peso: "63g",
        Sensor: "Focus Pro 30K",
        DPI: "30,000",
        Bateria: "90 horas",
      },
      stock: 18,
      isNew: true,
      isFeatured: true,
    },
    {
      name: "MAG B650 TOMAHAWK",
      slug: "mag-b650-tomahawk",
      brand: "MSI",
      category: "componentes",
      price: 259.99,
      images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=500"],
      description: "Placa base ATX para AMD Ryzen 7000 con PCIe 5.0",
      specs: {
        Socket: "AM5",
        Chipset: "AMD B650",
        RAM: "DDR5 hasta 128GB",
        "M.2 Slots": "2x PCIe 4.0",
      },
      stock: 10,
      isNew: false,
      isFeatured: false,
    },
    {
      name: "Ryzen 9 7950X",
      slug: "ryzen-9-7950x",
      brand: "AMD",
      category: "componentes",
      price: 549.99,
      comparePrice: 699.99,
      images: ["https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500"],
      description: "Procesador de 16 nucleos y 32 hilos para rendimiento extremo",
      specs: {
        Nucleos: "16",
        Hilos: "32",
        "Reloj Base": "4.5 GHz",
        "Reloj Boost": "5.7 GHz",
      },
      stock: 7,
      isNew: false,
      isFeatured: true,
    },
    {
      name: "UltraGear 27GP950",
      slug: "ultragear-27gp950",
      brand: "LG",
      category: "monitores",
      price: 799.99,
      images: ["https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500"],
      description: "Monitor 4K Nano IPS con 144Hz y HDMI 2.1",
      specs: {
        Resolucion: "3840x2160",
        Panel: "Nano IPS",
        "Tasa Refresco": "144Hz",
        HDR: "HDR600",
      },
      stock: 6,
      isNew: true,
      isFeatured: false,
    },
    {
      name: "Huntsman V2 TKL",
      slug: "huntsman-v2-tkl",
      brand: "Razer",
      category: "teclados",
      price: 159.99,
      images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"],
      description: "Teclado TKL con switches opticos y foam dampening",
      specs: {
        Switches: "Razer Optical",
        Formato: "TKL (87 teclas)",
        Retroiluminacion: "Razer Chroma RGB",
        Conexion: "USB-C desmontable",
      },
      stock: 14,
      isNew: false,
      isFeatured: false,
    },
    {
      name: "FURY Beast 32GB DDR5",
      slug: "fury-beast-32gb-ddr5",
      brand: "Kingston",
      category: "componentes",
      price: 124.99,
      images: ["https://images.unsplash.com/photo-1562976540-1502c2145186?w=500"],
      description: "Kit de memoria DDR5 de alto rendimiento para gaming",
      specs: {
        Capacidad: "32GB (2x16GB)",
        Velocidad: "5600 MT/s",
        Latencia: "CL40",
        Voltaje: "1.25V",
      },
      stock: 30,
      isNew: true,
      isFeatured: false,
    },
  ]

  for (const product of productsData) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        comparePrice: product.comparePrice,
        stock: product.stock,
        images: product.images,
        specs: product.specs,
        isNew: product.isNew,
        isFeatured: product.isFeatured,
        categoryId: categories[product.category],
        brandId: brands[product.brand],
      },
    })
  }
  console.log(`Created ${productsData.length} products`)

  // Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@basictech.com",
      password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu9lK", // password: admin123
      name: "Admin User",
      phone: "+51 999 888 777",
      role: "ADMIN",
      status: "ACTIVE",
    },
  })
  console.log(`Created admin user: ${adminUser.email}`)

  // Create Test Customer
  const customerUser = await prisma.user.create({
    data: {
      email: "juan@email.com",
      password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu9lK", // password: admin123
      name: "Juan Perez",
      phone: "+51 987 654 321",
      role: "CUSTOMER",
      status: "ACTIVE",
    },
  })
  console.log(`Created customer user: ${customerUser.email}`)

  // Create Address for Customer
  await prisma.address.create({
    data: {
      label: "Casa",
      name: "Juan Perez",
      phone: "+51 987 654 321",
      address: "Av. Javier Prado 1234",
      city: "Lima",
      state: "Lima",
      zipCode: "15036",
      isDefault: true,
      userId: customerUser.id,
    },
  })
  console.log("Created address for customer")

  console.log("Seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
