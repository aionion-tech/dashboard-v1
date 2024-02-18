import { BaseService } from "./base.service";

export class DatasetItemService extends BaseService {
  getDatasetItems = async ({
    workspaceId,
    projectId,
    datasetId,
  }: {
    workspaceId: string;
    projectId: string;
    datasetId: string;
  }) => {
    return this.instance.get(
      `api/v1/datasetitem/${workspaceId}/${projectId}/${datasetId}`
    );
  };

  uploadImage = async ({
    formData,
    workspaceId,
    projectId,
    datasetId,
  }: {
    formData: FormData;
    workspaceId: string;
    projectId: string;
    datasetId: string;
  }) => {
    return this.instance.post(
      `api/v1/datasetitem/${workspaceId}/${projectId}/${datasetId}`,
      formData
    );
  };
}
