import { BaseAPI } from "./base";
import { AuthService } from "../services/auth";
import { APIError } from "../types";

export class AuthAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Logs in a user.
   * @param data - Object containing the login data
   * @returns Promise with the API response
   */
  async login(data: Record<string, any>) {
    try {
      const payload = {
        grant_type: "password",
        client_id: this.config.passwordKey,
        client_secret: this.config.passwordSecret,
        username: data.email,
        password: data.password,
        scope: "",
      };
      const url = `${this.config.apiBasePath}/oauth/token`;
      const response = await this.axiosInstance.post(url, payload);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to login a user.",
        422
      );
    }
  }
}
