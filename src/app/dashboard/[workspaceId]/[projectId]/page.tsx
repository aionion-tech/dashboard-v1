import { getDatasetsAction } from "@/app/lib/actions/dataset.actions";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Workspace({ params }: any) {
  const datasets = await getDatasetsAction({
    workspaceId: params.workspaceId,
    projectId: params.projectId,
  });

  return (
    <main className="p-8 flex-grow">
      <section className="flex w-full flex-col">
        <div className="flex gap-6 md:gap-10 w-full justify-end">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={`/dashboard/${params.workspaceId}/${params.projectId}/create-dataset`}
          >
            Create dataset
          </Link>
        </div>
        <div>
          {datasets.map((dataset: any) => (
            <div key={dataset.id}>
              <Link
                href={`/dashboard/${params.workspaceId}/${params.projectId}/${dataset.id}`}
                className={buttonVariants({ variant: "outline" })}
              >
                {dataset.name}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
