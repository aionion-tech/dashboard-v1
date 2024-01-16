import type { NextAuthConfig } from "next-auth";

const protectedRoutes = ["/dashobard", "/"];
const authRoutes = ["/signin", "/signup"];

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      const isProtectedRoute = protectedRoutes.some((route) => {
        return nextUrl.pathname === route;
      });

      if (isProtectedRoute) {
        return isLoggedIn ?? Response.redirect(new URL("/signin", nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
