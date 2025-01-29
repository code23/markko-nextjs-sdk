import { BaseAPI } from './base';
import { AuthService } from '../services/auth';

export class TagsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of tags
   * @param params - The query parameters to filter the tags
   * @returns A list of tags
   */
  async list(params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/tags`;
    try {
      const response = await this.axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      throw new Error("A problem was encountered during the tags retrieval.");
    }
  }
}
