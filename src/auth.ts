import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";

interface ExtendedUser extends User {
  accessToken?: string;
  refreshToken?: string;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as ExtendedUser).accessToken;
        token.refreshToken = (user as ExtendedUser).refreshToken;
      }

      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = z
          .object({
            email: z.string().email(),
            password: z.string(),
          })
          .parse(credentials);

        const response = await fetch(
          "http://localhost:3000/api/v1/auth/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();

        if (response.ok && data.accessToken) {
          return {
            id: "123",
            email,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          } as ExtendedUser;
        }

        return null;
      },
    }),
  ],
});
