import { BaseAPI } from './base';
import { AuthService } from '../services/auth';
import { APIError } from '../types';


export class CharitiesAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of charities
   * @param params - The query parameters to filter the charities
   * @returns A list of charities
   */
  async list(params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/charities`;
    try {
      const response = await this.axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      throw new Error("A problem was encountered during the charities retrieval.");
    }
  }

  /**
   * Fetches the details of a charity by its ID.
   * @param  id - The unique ID of the charity to fetch.
   * @param  params - Optional query parameters for additional filtering or data inclusion.
   * @returns - A promise that resolves to the details of the specified charity.
   */
  async get(id: number, params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/charities/${id}`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

   /**
   * Save a new charity
   * @param data The charity data to be saved
   * @throws {APIError} If the API request fails or returns an error
   * @returns Promise<boolean> Returns true if successful
   */
   async save(data: Record<string, any>): Promise<boolean> {
    try {
      const url = `${this.config.apiBasePath}/api/v1/charities/register`;
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
          'A problem was encountered during the request to create a new Charity.',
          422
        );
      }
    }
  }

  /**
   * Get a single charity by slug
   * @param slug - The slug of the charity
   * @param params - The query parameters to filter the charity
   * @returns A single charity
   */
  async getBySlug(slug: string, params = {}) {
    const defaultParams = {
      is_active: 1
    };
    const url = `${this.config.apiBasePath}/api/v1/charities/slug/${slug}`;
    const response = await this.axiosInstance.get(url, { params: { ...defaultParams, ...params } });
    return response.data;
  }

   /**
   * Check if a charity (store) name is unique
   * @param name - The charity (store) name to check
   * @returns A boolean indicating if the charity (store) name is unique
   */
  async nameIsUnique(name: string) {
    const url = `${this.config.apiBasePath}/api/v1/charities/is-name-unique`;
    const response = await this.axiosInstance.get(url, { params: { name: name } });
    return response.data;
  }
}
