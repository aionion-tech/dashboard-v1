import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
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

        const user = { id: "123", email, password };

        if (!user) return null;

        return user;
      },
    }),
  ],
});
