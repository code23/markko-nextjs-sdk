import { BaseAPI } from './base';
import { AuthService, TokenData } from '../services/auth';

export class ReferenceValuesAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Lookup a reference value by category
   * @param params - The query parameters for the reference lookup
   * @param oauth - The OAuth token data (optional)
   * @returns A collection of reference values
   */
  async byCategory(params = {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/reference-values/lookup`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    try {
      const response = await this.axiosInstance.get(url, config);
      return response.data?.data ? response.data.data : [];
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'A problem was encountered during the reference value lookup.');
    }
  }
}
