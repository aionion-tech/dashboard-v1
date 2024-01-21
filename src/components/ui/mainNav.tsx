import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { auth, signOut } from "@/auth";
import { Button } from "./button";

export async function MainNav() {
  // I fucking hate next-auth
  const session = (await auth()) as {
    user: {
      email: string;
    };
  };

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "http://localhost:3002/" });
  };

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold">AIONION</span>
      </Link>
      <nav className="flex gap-6">
        {!session && (
          <>
            <Link
              href="/signin"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground"
              )}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground"
              )}
            >
              Sign up
            </Link>
          </>
        )}

        {session && (
          <form action={handleSignOut}>
            <Button className="text-background font-bold">Sign out</Button>
          </form>
        )}
      </nav>
    </div>
  );
}
