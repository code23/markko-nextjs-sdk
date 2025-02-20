import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";
import { BaseAPI } from "./base";

export class SpecificationGroupsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of specification groups
   * @param params - The query parameters to filter the specification groups
   * @param oauth - The OAuth token data
   * @returns A list of specification groups
   */
  async list(params: {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/specification-groups`;
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
        "A problem was encountered during the request to retrieve list of specification groups.",
        422
      );
    }
  }

  /**
   * Get a specific specification group by ID
   * @param id - The ID of the specification group
   * @param params - The query parameters to filter the specification group
   * @param oauth - The OAuth token data
   * @returns The specification group data
   */
  async get(id: string, params: {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/specification-groups/${id}`;
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
        "A problem was encountered during the request to retrieve a specification group by id.",
        422
      );
    }
  }
}
