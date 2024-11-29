import { BaseAPI } from './base';
import { AuthService } from '../services/auth';
import { APIError } from '../types';

export class VendorsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of vendors
   * @param params - The query parameters to filter the vendors
   * @returns A list of vendors
   */
  async list(params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/vendors`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

  /**
   * Get a list of vendors by postcode
   * @param postcode - The postcode to filter the vendors
   * @param params - The query parameters to filter the vendors
   * @returns A list of vendors
   */
  async listByPostcode(postcode: string, params = {}) {
    const defaultParams = {
      is_active: 1
    };
    postcode = postcode.replace(/\s+/g, '');
    const url = `${this.config.apiBasePath}/api/v1/vendors/postcode/${postcode}`;
    const response = await this.axiosInstance.get(url, { params: { ...defaultParams, ...params } });
    return response.data;
  }

  /**
   * Get a single vendor
   * @param id - The ID of the vendor
   * @param params - The query parameters to filter the vendor
   * @returns A single vendor
   */
  async get(id: number, params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/vendors/${id}`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

  /**
   * Get a single vendor by slug
   * @param slug - The slug of the vendor
   * @param params - The query parameters to filter the vendor
   * @returns A single vendor
   */
  async getBySlug(slug: string, params = {}) {
    const defaultParams = {
      is_active: 1
    };
    const url = `${this.config.apiBasePath}/api/v1/vendors/slug/${slug}`;
    const response = await this.axiosInstance.get(url, { params: { ...defaultParams, ...params } });
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

  /**
   * Follow a vendor
   * @param id - The ID of the vendor
   * @returns A single vendor
   */
  async follow(id: number) {
    const url = `${this.config.apiBasePath}/api/v1/vendors/${id}/follow`;
    const response = await this.axiosInstance.patch(url);
    return response.data;
  }

  /**
   * Unfollow a vendor
   * @param id - The ID of the vendor
   * @returns A single vendor
   */
  async unfollow(id: number) {
    const url = `${this.config.apiBasePath}/api/v1/vendors/${id}/unfollow`;
    const response = await this.axiosInstance.patch(url);
    return response.data;
  }

  /**
   * Check if a vendor (store) name is unique
   * @param name - The vendor (store) name to check
   * @returns A boolean indicating if the vendor (store) name is unique
   */
  async isStoreNameUnique(name: string) {
    const url = `${this.config.apiBasePath}/api/v1/vendors/is-store-name-unique`;
    const response = await this.axiosInstance.get(url, { params: { store_name: name } });
    return response.data;
  }
}
