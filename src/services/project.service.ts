import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

export class ProjectService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });

    this.instance.interceptors.request.use((config) => {
      const cookieStore = cookies();

      const accessToken = cookieStore.get("accessToken")?.value;
      const refreshToken = cookieStore.get("accessToken")?.value;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers["refreshToken"] = refreshToken;
      }

      return config;
    });

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const cookieStore = cookies();

          const refreshToken = cookieStore.get("accessToken")?.value;

          const res = await this.instance.post("/api/v1/auth/refresh", {
            refreshToken,
          });
          cookieStore.set("accessToken", res.data.accessToken);
          cookieStore.set("refreshToken", res.data.refreshToken);
          return this.instance(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }

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
