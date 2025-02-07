import { BaseAPI } from './base';
import { AuthService, TokenData } from '../services/auth';

export class ReviewsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of reviews
   * @param params - The query parameters to filter the reviews
   * @param oauth - The OAuth token data
   * @returns A list of reviews
   */
  async list(params = {}, oauth: TokenData | null = null) {
    const defaultParams = {
      paginate: 0,
      page: 1,
      with: 'product.images',
      sort: null,
    };
    const url = `${this.config.apiBasePath}/api/v1/reviews`;
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
   * Create a new review
   * @param data - The data to create the review with (should include 'product_id', 'review' and 'rating')
   * @param oauth - The OAuth token data
   * @returns The created review
   */
  async create(data: Record<string, any>, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/reviews`;
    const config: any = {};

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    const response = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  /**
   * Update an existing review
   * @param data - The data to update the review with (should include 'id', 'review' and 'rating')
   * @param oauth - The OAuth token data
   * @returns The updated review
   */
  async update(data: Record<string, any>, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/reviews`;
    const config: any = {};

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    const response = await this.axiosInstance.patch(url, data, config);
    return response.data;
  }

  /**
   * Delete an existing review
   * @param id - The ID of the review to delete
   * @param oauth - The OAuth token data
   * @returns The deleted review
   */
  async delete(id: number, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/reviews/${id}`;
    const config: any = {};

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    const response = await this.axiosInstance.delete(url, config);
    return response.data;
  }
}
