import { BaseAPI } from './base';
import { AuthService, TokenData } from '../services/auth';
import { APIError } from '../types';

export class CategoriesAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a nested list of categories and subcategories
   * @param params - The query parameters to filter the categories
   * @param oauth - The OAuth token data
   * @returns A list of categories
   */
  async list(params = {}, oauth: TokenData | null = null) {
    const defaultParams = {
      with: 'images,active_children_categories.images',
      is_null: 'top_id'
    };
    const url = `${this.config.apiBasePath}/api/v1/categories`;
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
   * Get a nested list of categories and subcategories
   * @param params - The query parameters to filter the categories
   * @param oauth - The OAuth token data
   * @returns A list of categories
   */
  async listNested(params = {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/categories/nested`;
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
   * Get a category by id
   * @param id - The ID of the category
   * @param params - The query parameters to filter the category
   * @param oauth - The OAuth token data
   * @returns A single category
   */
  async get(id: number, params = {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/categories/${id}`;
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
   * Get a category by its slug
   * @param slug - The slug of the category
   * @param params - The query parameters to filter the category
   * @param oauth - The OAuth token data
   * @returns A category
   */
  async getBySlug(slug: string, params = {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/categories/slug/${slug}`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }
}
