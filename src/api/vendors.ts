import { BaseAPI } from './base';
import { AuthService } from '../services/auth';
import { APIError } from '../types';

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

  /**
   * Save a new vendor
   * @param data The vendor data to be saved
   * @throws {APIError} If the API request fails or returns an error
   * @returns Promise<boolean> Returns true if successful
   */
  async save(data: Record<string, any>): Promise<boolean> {
    try {
      const url = `${this.config.apiBasePath}/api/v1/vendors/register`;
      const response = await this.axiosInstance.post(url, data);

      // Check if the response contains an error
      if (response.data?.error) {
        throw new APIError(response.data.message, response.data.code);
      }

      return true;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      } else {
        throw new APIError(
          'A problem was encountered during the request to create a new user & vendor.',
          422
        );
      }
    }
  }
}
