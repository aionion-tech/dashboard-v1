"use server";

import { datasetItemService } from "@/services";

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
