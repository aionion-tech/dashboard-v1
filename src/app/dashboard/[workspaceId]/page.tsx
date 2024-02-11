import { getProjectsAction } from "@/app/lib/actions/project.action";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Workspace({ params }: any) {
  const projects = await getProjectsAction({
    workspaceId: params.workspaceId,
  });

  return (
    <main className="p-8 flex-grow">
      <section className="flex w-full flex-col">
        <div className="flex gap-6 md:gap-10 w-full justify-end">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={`/dashboard/${params.workspaceId}/create-project`}
          >
            Create project
          </Link>
        </div>
        <div>
          {projects.map((project: any) => (
            <Link
              href={`/dashboard/${params.workspaceId}/${project.id}`}
              className={buttonVariants({ variant: "outline" })}
              key={project.id}
            >
              {project.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
