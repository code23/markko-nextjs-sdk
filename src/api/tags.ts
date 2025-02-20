import { BaseAPI } from "./base";
import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";

export class TagsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of tags
   * @param params - The query parameters to filter the tags
   * @param oauth - The OAuth token data
   * @returns A list of tags
   */
  async list(params = {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/tags`;
      const config: any = { params };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.get(url, config);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to retrieve list of tags.",
        422
      );
    }
  }
}
