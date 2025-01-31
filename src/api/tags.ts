import { BaseAPI } from './base';
import { AuthService, TokenData } from '../services/auth';

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
    const url = `${this.config.apiBasePath}/api/v1/tags`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    try {
      const response = await this.axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      throw new Error("A problem was encountered during the tags retrieval.");
    }
  }
}
