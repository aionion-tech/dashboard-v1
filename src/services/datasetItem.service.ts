import { BaseService } from "./base.service";

export class DatasetItemService extends BaseService {
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
