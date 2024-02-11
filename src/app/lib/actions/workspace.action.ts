import { workspaceService } from "@/services";

export async function getWorkspacesAction() {
  const { data } = await workspaceService.getWorkspaces();

  return data;
}

export async function createWorkspaceAction({ name }: { name: string }) {
  const { data } = await workspaceService.createWorkspace({ name });

  return data;
}
