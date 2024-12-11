import { BaseAPI } from './base';
import { AuthService } from '../services/auth';

export class SpecificationAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a specification by code
   * @param code - The specification code to fetch
   * @param params - Optional query parameters
   * @returns The fetched specification data
   */
  async getSpecificationByCode(code: string, params: { with?: string } = { with: 'values' }) {
    const url = `${this.config.apiBasePath}/api/v1/specifications/code/${code}`;
    try {
      const response = await this.axiosInstance.get(url, { params });
      return response.data?.data;
    } catch (error) {
      throw new Error('Error attempting to retrieve the specification by code.');
    }
  }

  /**
   * List specification items
   * @param params - Optional query parameters
   * @returns A list of specifications
   */
  async listSpecifications(params: { with?: string; in?: string } = { with: 'values' }) {
    const url = `${this.config.apiBasePath}/api/v1/specifications`;
    try {
      const response = await this.axiosInstance.get(url, { params });
      return response.data?.data;
    } catch (error) {
      throw new Error('Error attempting to retrieve the specifications.');
    }
  }
}
