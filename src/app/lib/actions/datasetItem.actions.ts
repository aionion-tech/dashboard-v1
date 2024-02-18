"use server";

import { datasetItemService } from "@/services";

export async function getImagesetItemsAction({
  workspaceId,
  projectId,
  datasetId,
}: {
  workspaceId: string;
  projectId: string;
  datasetId: string;
}) {
  const { data } = await datasetItemService.getDatasetItems({
    workspaceId,
    projectId,
    datasetId,
  });

  return data;
}

export async function uploadImageAction({
  formData,
  workspaceId,
  projectId,
  datasetId,
}: {
  formData: FormData;
  workspaceId: string;
  projectId: string;
  datasetId: string;
}) {
  const { data } = await datasetItemService.uploadImage({
    formData,
    workspaceId,
    projectId,
    datasetId,
  });

  return data;
}
