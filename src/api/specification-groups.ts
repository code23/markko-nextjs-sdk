import { AuthService, TokenData } from "../services/auth";
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
    const url = `${this.config.apiBasePath}/api/v1/specification-groups`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Get a specific specification group by ID
   * @param id - The ID of the specification group
   * @param params - The query parameters to filter the specification group
   * @param oauth - The OAuth token data
   * @returns The specification group data
   */
  async get(id: string, params: {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/specification-groups/${id}`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }
}
