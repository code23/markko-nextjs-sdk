import { BaseAPI } from './base';
import { AuthService } from '../services/auth';

export class VendorsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  async list(params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/vendors`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

  async get(id: number, params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/vendors/${id}`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }
}
