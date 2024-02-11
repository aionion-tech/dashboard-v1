import { getDatasetsAction } from "@/app/lib/actions/dataset.actions";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Workspace({ params }: any) {
  console.log(params);
  const datasets = await getDatasetsAction({
    workspaceId: params.workspaceId,
    projectId: params.projectid,
  });

  return (
    <main className="p-8 flex-grow">
      <section className="flex w-full flex-col">
        <div className="flex gap-6 md:gap-10 w-full justify-end">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={`/dashboard/${params.workspaceId}/${params.projectid}/create-dataset`}
          >
            Create dataset
          </Link>
        </div>
        <div>
          {datasets.map((dataset: any) => (
            <Link
              href={`/dashboard/${params.workspaceId}/${params.projectid}/${dataset.id}`}
              className={buttonVariants({ variant: "outline" })}
              key={dataset.id}
            >
              {dataset.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
