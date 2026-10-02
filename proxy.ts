import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    requestHeaders.set("x-genos-locale", "fr");
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    requestHeaders.set("x-genos-locale", "en");
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Keep old English URLs working while making /en the public canonical path.
  const destination = request.nextUrl.clone();
  destination.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.json$|.*\\.txt$|robots.txt|sitemap.xml).*)"],
};
