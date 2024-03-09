import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { cookies } from "next/headers";

export async function MainNav() {
  const cookieStore = cookies();
  const userId = cookieStore.get("id")?.value;

  const handleSignOut = async () => {
    "use server";
  };

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold">AIONION</span>
      </Link>
      <nav className="flex gap-6">
        {!userId && (
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

        {userId && (
          <>
            <form action={handleSignOut}>
              <Button className="text-background font-bold">Sign out</Button>
            </form>
            <Link
              href={`/dashboard`}
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground"
              )}
            >
              Dashobard
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
