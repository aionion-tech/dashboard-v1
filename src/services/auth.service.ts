import { getAuthorizationHeader } from "@/utils/getAuthorizationHeader";
import axios, { AxiosInstance } from "axios";

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  signin = (email: string, password: string) => {
    return this.instance
      .post("/api/v1/auth/signin", {
        email,
        password,
      })
      .then((res) => {
        return {
          id: res.data.userId,
          email: email,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          expiredAt: res.data.accessTokenExpiresIn,
        };
      });
  };

  signup = (email: string, password: string) => {
    return this.instance
      .post("/api/v1/auth/signup", {
        email,
        password,
      })
      .then((res) => {
        return {
          id: res.data.userId,
          email: email,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          expiredAt: res.data.accessTokenExpiresIn,
        };
      });
  };

  getMe = (userId: string) => {
    return this.instance
      .get(`/users/${userId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      });
  };
}
