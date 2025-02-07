import { AuthService, TokenData } from "../services/auth";
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
    const url = `${this.config.apiBasePath}/api/v1/specifications`;
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
   * Retrieve a specification by its code
   * @param code - The code of the specification to retrieve
   * @param params - The parameters to filter the specification
   * @param oauth - The OAuth token data (optional)
   * @returns The specification data
   */
  async get(code: string, params: {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/specifications/code/${code}`;
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
