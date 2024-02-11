import { projectService } from "@/services";

export async function getProjectsAction({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const { data } = await projectService.getProjects({
    workspaceId,
  });

  return data;
}

export async function createProjectAction({
  workspaceId,
  name,
}: {
  workspaceId: string;
  name: string;
}) {
  console.log("workspaceId", workspaceId);
  const { data } = await projectService.createProject({
    workspaceId,
    name,
  });

  return data;
}
