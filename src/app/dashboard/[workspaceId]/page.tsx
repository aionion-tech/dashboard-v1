import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Workspace({ params }: any) {
  const session = (await auth()) as any;
  const getProjects = async () => {
    const res = await fetch(
      `http://localhost:3000/api/v1/project/${params.workspaceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session!.accessToken}`,
        },
      }
    );
    return (await res.json()).projects;
  };

  const projects = await getProjects();

  console.log(projects);
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
