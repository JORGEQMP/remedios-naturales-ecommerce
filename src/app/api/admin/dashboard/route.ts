import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Get all stats in parallel
    const [
      totalProducts,
      totalCustomers,
      totalOrders,
      revenueData,
      recentOrders,
      ordersByStatus,
    ] = await Promise.all([
      // Total products
      prisma.product.count(),

      // Total customers (users with CUSTOMER role)
      prisma.user.count({
        where: { role: "CUSTOMER" },
      }),

      // Total orders
      prisma.order.count(),

      // Total revenue (sum of all order totals)
      prisma.order.aggregate({
        _sum: { total: true },
      }),

      // Recent orders (last 5)
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      }),

      // Orders by status
      prisma.order.groupBy({
        by: ["status"],
        _count: true,
      }),
    ])

    // Transform orders by status to object
    const statusCounts = ordersByStatus.reduce(
      (acc, item) => {
        acc[item.status.toLowerCase()] = item._count
        return acc
      },
      {} as Record<string, number>
    )

    // Transform recent orders
    const transformedRecentOrders = recentOrders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customer: order.user.name,
      email: order.user.email,
      total: Number(order.total),
      status: order.status.toLowerCase(),
      createdAt: order.createdAt.toISOString(),
    }))

    return NextResponse.json({
      stats: {
        totalProducts,
        totalCustomers,
        totalOrders,
        totalRevenue: Number(revenueData._sum.total || 0),
      },
      ordersByStatus: {
        pending: statusCounts.pending || 0,
        processing: statusCounts.processing || 0,
        shipped: statusCounts.shipped || 0,
        delivered: statusCounts.delivered || 0,
        cancelled: statusCounts.cancelled || 0,
      },
      recentOrders: transformedRecentOrders,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      { error: "Error fetching dashboard stats" },
      { status: 500 }
    )
  }
}
