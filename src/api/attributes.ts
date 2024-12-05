import { BaseAPI } from './base';
import { AuthService } from '../services/auth';

export class AttributesAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * List the active product attributes
   * @param params - The parameters to filter the attributes
   * @returns The list of attributes
   */
  async list(params = {}) {
    const defaultParams = {
      with: 'values',
      is_active: 1
    };
    const url = `${this.config.apiBasePath}/api/v1/attributes`;
    const response = await this.axiosInstance.get(url, { params: { ...defaultParams, ...params } });
    return response.data;
  }
}
