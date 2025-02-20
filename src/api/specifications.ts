import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";
import { BaseAPI } from "./base";

export class SpecificationsAPI extends BaseAPI {
  constructor(config: any, authservice: AuthService) {
    super(config, authservice);
  }

  /**
   * Retrieve a list of specifications
   * @param params - The parameters to filter the specifications
   * @param oauth - The OAuth token data (optional)
   * @returns The list of specifications
   */
  async list(params: {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/specifications`;
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
        "A problem was encountered during the request to retrieve list of specifications.",
        422
      );
    }
  }

  /**
   * Retrieve a specification by its code
   * @param code - The code of the specification to retrieve
   * @param params - The parameters to filter the specification
   * @param oauth - The OAuth token data (optional)
   * @returns The specification data
   */
  async get(code: string, params: {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/specifications/code/${code}`;
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
        "A problem was encountered during the request to retrieve specifications by its code.",
        422
      );
    }
  }
}
