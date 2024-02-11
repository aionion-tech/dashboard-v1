import { BaseService } from "./base.service";

export class DatasetService extends BaseService {
  public async getDatasets({
    workspaceId,
    projectId,
  }: {
    workspaceId: string;
    projectId: string;
  }) {
    const res = await this.instance.get(
      `/api/v1/dataset/${workspaceId}/${projectId}`
    );
    return res.data;
  }

  public async createDataset({
    workspaceId,
    projectId,
    name,
  }: {
    workspaceId: string;
    projectId: string;
    name: string;
  }) {
    const res = await this.instance.post(
      `/api/v1/dataset/${workspaceId}/${projectId}`,
      {
        name,
      }
    );

    return res.data;
  }
}
