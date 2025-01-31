import { BaseAPI } from './base';
import { AuthService, TokenData } from '../services/auth';
import { APIError } from '../types';

export class CharitiesAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of charities
   * @param params - The query parameters to filter the charities
   * @param oauth - The OAuth token data
   * @returns A list of charities
   */
  async list(params = {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/charities`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    try {
      const response = await this.axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      throw new Error("A problem was encountered during the charities retrieval.");
    }
  }

  /**
   * Fetches the details of a charity by its ID.
   * @param  id - The unique ID of the charity to fetch.
   * @param  params - Optional query parameters for additional filtering or data inclusion.
   * @param oauth - The OAuth token data
   * @returns - A promise that resolves to the details of the specified charity.
   */
  async get(id: number, params = {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/charities/${id}`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

   /**
   * Save a new charity
   * @param data The charity data to be saved
   * @param oauth - The OAuth token data
   * @throws {APIError} If the API request fails or returns an error
   * @returns Promise<boolean> Returns true if successful
   */
   async save(data: Record<string, any>, oauth: TokenData | null = null): Promise<boolean> {
    const config: any = { data };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    try {
      const url = `${this.config.apiBasePath}/api/v1/charities/register`;
      const response = await this.axiosInstance.post(url, data, config);
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
   * @param oauth - The OAuth token data
   * @returns A single charity
   */
  async getBySlug(slug: string, params = {}, oauth: TokenData | null = null) {
    const defaultParams = {
      is_active: 1
    };
    const url = `${this.config.apiBasePath}/api/v1/charities/slug/${slug}`;
    const config: any = { params: { ...defaultParams, ...params } };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

   /**
   * Check if a charity (store) name is unique
   * @param name - The charity (store) name to check
   * @param oauth - The OAuth token data
   * @returns A boolean indicating if the charity (store) name is unique
   */
  async nameIsUnique(name: string, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/charities/is-name-unique`;
    const config: any = { params: { name } };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }
}
