import { AuthService, TokenData } from "../services/auth";
import { BaseAPI } from "./base";

export class ProductsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of products
   * @param params - The query parameters to filter the products
   * @param oauth - The OAuth token data
   * @returns A list of products
   */
  async list(params = {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/products`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Get a filtered list of products with advanced filtering options
   * @param params - The filter parameters for the products query
   * @param oauth - The OAuth token data
   * @returns A collection of products, either paginated or non-paginated
   */
  async listWithFilters(params: Record<string, any> = {}, oauth: TokenData | null = null) {
    if ('paginate' in params) {
      params.mpe_paginate = params.paginate;
      delete params.paginate;
    }
    const url = `${this.config.apiBasePath}/api/v1/products/filter`;
    const config: any = {params};

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.post(url, config);
    return response.data;
  }

  /**
   * Get a single product by vendor and product slug
   * @param vendorSlug - The slug of the vendor
   * @param productSlug - The slug of the product
   * @param params - Optional API parameters
   * @param oauth - The OAuth token data
   * @returns A single product's data
   */
  async get(
    vendorSlug: string,
    productSlug: string,
    params: Record<string, any> = {},
    oauth: TokenData | null = null
  ) {
    const url = `${this.config.apiBasePath}/api/v1/vendor/${vendorSlug}/product/${productSlug}`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Lookup product variant by code
   * @param id - Product ID
   * @param code - Variant code (e.g. '1.4-2.12-6.7')
   * @returns Product variant data
   * @throws Error if the API call fails or variant is not found
   */
  async variantLookup(id: number, code: string , oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/product/${id}/variants/lookup/${code}`;
    const config: any = {};

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Get a single product by ID
   * @param id - Product ID
   * @param params - Optional API parameters
   * @param oauth - The OAuth token data
   * @returns A single product's data
   */
  async getById( id: number , params =  {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/products/${id}`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Get a single product by slug
   * @param slug - Product slug
   * @param params - Optional API parameters
   * @param oauth - The OAuth token data
   * @returns A single product's data
   */
  async getBySlug( slug: string,  params = {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/products/slug/${slug}`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Get the most recently added products across all vendors
   * @param count - The number of products to retrieve (default = 3)
   * @param params - Optional API parameters
   * @param oauth - The OAuth token data
   * @returns A list of latest products
   */
  async latest(count: number = 3, params = {} , oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/products`;
    const config: any = {
      params: {
        sort: 'created_at,desc',
        paginate: count,
        page: 1,
        ...params
      }
    };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }
}
