import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const addresses = await prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    })

    const transformedAddresses = addresses.map((address) => ({
      id: address.id,
      label: address.label,
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      isDefault: address.isDefault,
    }))

    return NextResponse.json(transformedAddresses)
  } catch (error) {
    console.error("Error fetching addresses:", error)
    return NextResponse.json(
      { error: "Error fetching addresses" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const userId = session.user.id

    // If this is set as default, unset other defaults
    if (body.isDefault) {
      await prisma.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      })
    }

    const address = await prisma.address.create({
      data: {
        label: body.label,
        name: body.name,
        phone: body.phone,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        isDefault: body.isDefault || false,
        userId,
      },
    })

    return NextResponse.json(
      {
        id: address.id,
        label: address.label,
        name: address.name,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        isDefault: address.isDefault,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating address:", error)
    return NextResponse.json(
      { error: "Error creating address" },
      { status: 500 }
    )
  }
}
