import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  // Если пользователь авторизован и пытается зайти на страницу авторизации
  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*"],
}; 