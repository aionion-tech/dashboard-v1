import { AuthService } from "./auth.service";
import { DatasetService } from "./dataset.service";
import { ProjectService } from "./project.service";
import { WorkspaceService } from "./workspace.service";

export const authService = new AuthService("//localhost:3000");
export const workspaceService = new WorkspaceService("//localhost:3000");
export const projectService = new ProjectService("//localhost:3000");
export const datasetService = new DatasetService("//localhost:3000");
