import { datasetService } from "@/services";

export async function getDatasetsAction({
  workspaceId,
  projectId,
}: {
  workspaceId: string;
  projectId: string;
}) {
  const { data } = await datasetService.getDatasets({
    workspaceId,
    projectId,
  });

  return data;
}

export async function createDatasetAction({
  workspaceId,
  projectId,
  name,
}: {
  workspaceId: string;
  projectId: string;
  name: string;
}) {
  const { data } = await datasetService.createDataset({
    workspaceId,
    projectId,
    name,
  });

  return data;
}
