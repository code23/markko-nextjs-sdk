import { BaseAPI } from './base';
import { AuthService, TokenData } from '../services/auth';

export class AttributesAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * List the active product attributes
   * @param params - The parameters to filter the attributes
   * @param oauth - The OAuth token data
   * @returns The list of attributes
   */
  async list(params = {}, oauth: TokenData | null = null) {
    const defaultParams = {
      with: 'values',
      is_active: 1
    };
    const url = `${this.config.apiBasePath}/api/v1/attributes`;
    const config: any = { params: { ...defaultParams, ...params } };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }
}
