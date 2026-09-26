import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { transformBrand } from "@/lib/transformers"

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: { products: { where: { isActive: true } } },
        },
      },
      orderBy: { name: "asc" },
    })

    return NextResponse.json(brands.map(transformBrand))
  } catch (error) {
    console.error("Error fetching brands:", error)
    return NextResponse.json(
      { error: "Error fetching brands" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const brand = await prisma.brand.create({
      data: {
        name: body.name,
        slug: body.slug,
        logo: body.logo,
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    })

    return NextResponse.json(transformBrand(brand), { status: 201 })
  } catch (error) {
    console.error("Error creating brand:", error)
    return NextResponse.json(
      { error: "Error creating brand" },
      { status: 500 }
    )
  }
}
