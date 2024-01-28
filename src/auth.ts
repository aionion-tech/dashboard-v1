import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";

interface ExtendedUser extends User {
  userId?: string;
  accessToken?: string;
  refreshToken?: string;
  email?: string;
  workspaceId?: string;
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
        console.log(user);
        token.userId = (user as ExtendedUser).userId;
        token.accessToken = (user as ExtendedUser).accessToken;
        token.refreshToken = (user as ExtendedUser).refreshToken;
        token.email = (user as ExtendedUser).email;
        token.workspaceId = (user as ExtendedUser).workspaceId;
      }

      return token;
    },
    async session({ session, token }) {
      // NEXT-AUTH IS A PIECE OF MALWARE. FIND ANOTHER LIBRARY.
      (session as any).userId = token.userId;
      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;
      (session as any).email = token.email;
      (session as any).workspaceId = token.workspaceId;

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
            id: `${data.userId}`,
            userId: data.userId,
            email,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            workspaceId: data.workspaceId,
          } as ExtendedUser;
        }

        return null;
      },
    }),
  ],
});
