import { BaseService } from "./base.service";

export class WorkspaceService extends BaseService {
  public async getWorkspaces() {
    const res = await this.instance.get("/api/v1/workspace");
    return res.data;
  }

  public async createWorkspace({ name }: { name: string }) {
    const res = await this.instance.post("/api/v1/workspace", {
      name,
    });

    return res.data;
  }
}
