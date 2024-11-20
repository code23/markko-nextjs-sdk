import { BaseAPI } from './base';

export class VendorsAPI extends BaseAPI {
  async list(params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/vendors`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }
}
