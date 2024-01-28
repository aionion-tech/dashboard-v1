import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  const session = (await auth()) as any;

  const getUserWorkspaces = async () => {
    const res = await fetch("http://localhost:3000/api/v1/workspace", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const workspaces = await res.json();
    return workspaces.userWorkspaces;
  };

  const workspaces = await getUserWorkspaces();

  return (
    <main className="p-8 flex-grow">
      <section className="flex w-full flex-col">
        <div className="flex gap-6 md:gap-10 w-full justify-end">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/dashboard/create-workspace"
          >
            Create workspace
          </Link>
        </div>
        <div>
          {workspaces.map((workspace: any) => (
            <div key={workspace.id}>
              <Link
                className={buttonVariants({ variant: "outline" })}
                href={`/dashboard/${workspace.id}`}
              >
                {workspace.name}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
