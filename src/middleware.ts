import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

// Routes that require authentication
const protectedRoutes = ["/profile", "/checkout"]

// Routes only for admin users
const adminRoutes = ["/admin"]

// Routes only for guests (not logged in)
const guestRoutes = ["/login", "/register"]

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isAdmin = req.auth?.user?.role === "ADMIN"

  // Check if the current path matches any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  )

  // Check if the current path matches any admin route
  const isAdminRoute = adminRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  )

  // Check if the current path matches any guest route
  const isGuestRoute = guestRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  )

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl)
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to home if accessing admin route without admin role
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  // Redirect to home if accessing guest route while logged in
  if (isGuestRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Match all routes except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
