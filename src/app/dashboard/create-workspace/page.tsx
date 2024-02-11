import { createWorkspaceAction } from "@/app/lib/actions/workspace.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

export default async function CreateWorkspace() {
  const handleSubmit = async (data: FormData) => {
    "use server";
    await createWorkspaceAction({
      name: data.get("name") as string,
    });

    redirect("/dashboard");
  };

  return (
    <main className="p-8 flex-grow">
      <section className="flex w-full">
        <form action={handleSubmit} className="w-full h-full">
          <Card className="w-full h-full">
            <CardContent className="flex p-8 min-h-96 h-full">
              <div className="w-full flex items-center justify-center">
                <div className="w-[70%]">
                  <div className="mb-4">
                    <Label htmlFor="name">Workspace name</Label>
                    <Input
                      id="name"
                      type="name"
                      name="name"
                      placeholder="Enter workspace name"
                      required
                    />
                  </div>
                  <Button className="w-full">
                    <span>Create</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </section>
    </main>
  );
}