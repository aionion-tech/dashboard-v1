import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function Project({
  params: { workspaceId, projectId, datasetId },
}: {
  params: {
    workspaceId: string;
    projectId: string;
    datasetId: string;
  };
}) {
  return (
    <main className="flex flex-col p-8 flex-grow  justify-center">
      <section className="flex flex-col">
        <div className="flex justify-evenly">
          <Link
            href={`/dashboard/${workspaceId}/${projectId}/${datasetId}/annotate`}
          >
            <Card className="flex-1 m-4">
              <CardHeader>
                <CardTitle className="text-center  text-xl">Annotate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Annotate your dataset with the help of our powerful annotation
                  tool.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link
            href={`/dashboard/${workspaceId}/${projectId}/${datasetId}/upload`}
          >
            <Card className="flex-1 m-4">
              <CardHeader>
                <CardTitle className="text-center  text-xl">Import</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Import your dataset from your local machine or from a cloud
                  storage provider.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link
            href={`/dashboard/${workspaceId}/${projectId}/${datasetId}/settings`}
          >
            <Card className="flex-1 m-4">
              <CardHeader>
                <CardTitle className="text-center  text-xl">Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Configure your dataset settings to fit your needs. You can
                  change the name, description, and more.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </main>
  );
}
