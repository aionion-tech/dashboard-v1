import { BaseService } from "./base.service";

export class ProjectService extends BaseService {
  public async getProjects({ workspaceId }: { workspaceId: string }) {
    const res = await this.instance.get(`/api/v1/project/${workspaceId}`);
    return res.data;
  }

  public async createProject({
    workspaceId,
    name,
  }: {
    workspaceId: string;
    name: string;
  }) {
    const res = await this.instance.post(`/api/v1/project/${workspaceId}`, {
      name,
    });

    return res.data;
  }
}
