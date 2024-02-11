import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getWorkspacesAction } from "../lib/actions/workspace.action";

export default async function Dashboard() {
  const workspaces = await getWorkspacesAction();

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
