import Link from "next/link";
import { Button } from "./button";
import { signOut } from "../../auth";

export const Navbar = () => {
  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "http://localhost:3000/" });
  };

  return (
    <div
      className="flex justify-between items-center w-full h-16 bg-whit
        e px-8"
    >
      <div className="flex items-center space-x-4">
        <h1 className="font-bold text-xl">AIONION</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/signin" className="text-primary font-bold">
          Sign in
        </Link>
        <Link href="/signup" className="text-primary font-bold">
          Sign up
        </Link>
        <form action={handleSignOut}>
          <Button className="text-primary font-bold">Sign out</Button>
        </form>
      </div>
    </div>
  );
};
