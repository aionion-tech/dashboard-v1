import type { NextAuthConfig } from "next-auth";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/signin", "/signup"];

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL(`/`, nextUrl));
      }
      const isProtectedRoute = protectedRoutes.some((route) => {
        return nextUrl.pathname.includes(route);
      });

      if (isProtectedRoute) {
        return isLoggedIn ?? Response.redirect(new URL("/signin", nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
