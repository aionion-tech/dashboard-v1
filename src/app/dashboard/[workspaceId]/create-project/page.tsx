import { createProject } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateProject({ params }: any) {
  const handleSubmit = async (data: FormData) => {
    "use server";

    const response = await createProject(data, params.workspaceId);
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
                    <Label htmlFor="name">Project name</Label>
                    <Input
                      id="name"
                      type="name"
                      name="name"
                      placeholder="Enter project name"
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
