import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RUTAS_PROTEGIDAS = [
  "/dashboard", "/vivian", "/agenda", "/medicamentos",
  "/telemedicina", "/bienestar", "/ocio", "/nutricion",
];
const RUTAS_AUTH = ["/login", "/registro"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const esRutaProtegida = RUTAS_PROTEGIDAS.some(ruta =>
    pathname === ruta || pathname.startsWith(ruta + "/")
  );
  const esRutaAuth = RUTAS_AUTH.some(ruta => pathname === ruta);

  if (!esRutaProtegida && !esRutaAuth) return NextResponse.next();

  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Ruta protegida sin sesión → login
  if (esRutaProtegida && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Ruta de auth con sesión activa → dashboard (evita pantalla de login al volver del magic link)
  if (esRutaAuth && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*", "/vivian/:path*",
    "/agenda/:path*", "/medicamentos/:path*",
    "/telemedicina/:path*", "/bienestar/:path*",
    "/ocio/:path*", "/nutricion/:path*",
    "/login", "/registro",
  ],
};
