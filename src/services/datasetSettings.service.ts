import { BaseService } from "./base.service";

export class DatasetSettingsService extends BaseService {
  getSettings = async ({
    workspaceId,
    projectId,
    datasetId,
  }: {
    workspaceId: string;
    projectId: string;
    datasetId: string;
  }) => {
    return this.instance.get(
      `api/v1/datasetsettings/${workspaceId}/${projectId}/${datasetId}`
    );
  };

  updateSettings = async ({
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
  }) => {
    return this.instance.put(
      `api/v1/datasetsettings/${workspaceId}/${projectId}/${datasetId}`,
      {
        name,
        description,
        labels,
      }
    );
  };
}
