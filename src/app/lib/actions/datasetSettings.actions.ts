"use server";

import { datasetSettingsService } from "@/services";

export async function getDatasetSettingsAction({
  workspaceId,
  projectId,
  datasetId,
}: {
  workspaceId: string;
  projectId: string;
  datasetId: string;
}) {
  const { data } = await datasetSettingsService.getSettings({
    workspaceId,
    projectId,
    datasetId,
  });

  return data;
}

export async function updateDatasetSettingsAction({
  workspaceId,
  projectId,
  datasetId,
  name,
  description,
  labels,
}: {
  workspaceId: string;
  projectId: string;
  datasetId: string;
  name: string;
  description: string;
  labels: {
    name: string;
    color: string;
    prompts: string[];
  }[];
}) {
  const { data } = await datasetSettingsService.updateSettings({
    workspaceId,
    projectId,
    datasetId,
    name,
    description,
    labels,
  });

  return data;
}
