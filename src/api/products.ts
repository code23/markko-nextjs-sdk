import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";
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
    try {
      const url = `${this.config.apiBasePath}/api/v1/products`;
      const config: any = { params };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.get(url, config);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to retrieve list of products.",
        422
      );
    }
  }

  /**
   * Get a filtered list of products with advanced filtering options
   * @param params - The filter parameters for the products query
   * @param oauth - The OAuth token data
   * @returns A collection of products, either paginated or non-paginated
   */
  async listWithFilters(
    params: Record<string, any> = {},
    oauth: TokenData | null = null
  ) {
    try {
      if ("paginate" in params) {
        params.mpe_paginate = params.paginate;
        delete params.paginate;
      }
      const url = `${this.config.apiBasePath}/api/v1/products/filter`;
      const config: any = { params };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.get(url, config);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to retrieve filtered products list.",
        422
      );
    }
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
    try {
      const url = `${this.config.apiBasePath}/api/v1/vendor/${vendorSlug}/product/${productSlug}`;
      const config: any = { params };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.get(url, config);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to retrieve single product.",
        422
      );
    }
  }

  /**
   * Lookup product variant by code
   * @param id - Product ID
   * @param code - Variant code (e.g. '1.4-2.12-6.7')
   * @returns Product variant data
   * @throws Error if the API call fails or variant is not found
   */
  async variantLookup(
    id: number,
    code: string,
    oauth: TokenData | null = null
  ) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/product/${id}/variants/lookup/${code}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.get(url, config);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to retrieve product by variant code.",
        422
      );
    }
  }

  /**
   * Get a single product by ID
   * @param id - Product ID
   * @param params - Optional API parameters
   * @param oauth - The OAuth token data
   * @returns A single product's data
   */
  async getById(id: number, params = {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${id}`;
      const config: any = { params };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.get(url, config);
      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to retrieve single product by id.",
        422
      );
    }
  }

  /**
   * Get a single product by slug
   * @param slug - Product slug
   * @param params - Optional API parameters
   * @param oauth - The OAuth token data
   * @returns A single product's data
   */
  async getBySlug(slug: string, params = {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/slug/${slug}`;
      const config: any = { params };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.get(url, config);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to retrieve single product by slug.",
        422
      );
    }
  }

  /**
   * Get the most recently added products across all vendors
   * @param count - The number of products to retrieve (default = 3)
   * @param params - Optional API parameters
   * @param oauth - The OAuth token data
   * @returns A list of latest products
   */
  async latest(count: number = 3, params = {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products`;
      const config: any = {
        params: {
          sort: "created_at,desc",
          paginate: count,
          page: 1,
          ...params,
        },
      };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.get(url, config);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to retrieve latest products.",
        422
      );
    }
  }

  /**
   * Get the total count of products across all vendors.
   * @param params - Optional API parameters to filter the product count.
   * @param oauth - The OAuth token data for authentication.
   * @returns The total number of products.
   */
  async count(params: {}, oauth: TokenData | null = null) {
    try {
      const defaultparams = {
        sort: "created_at,desc",
      };

      const url = `${this.config.apiBasePath}/api/v1/products/count`;

      const config: any = { params: { ...defaultparams, ...params } };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.get(url, config);
      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to retrieve count of products",
        422
      );
    }
  }

  /**
   * Create a new product.
   * @param product - An object containing product details.
   * @param oauth - The OAuth token data for authentication.
   * @returns The created product data.
   */
  async create(product: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.post(url, product, config);
      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to create a product",
        422
      );
    }
  }

  /**
   * Update an existing product.
   * @param id - The ID of the product to update.
   * @param params - An object containing the updated product details.
   * @param oauth - The OAuth token data for authentication.
   * @returns The updated product data.
   */
  async update(
    id: number,
    product: Record<string, any>,
    oauth: TokenData | null = null
  ) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${id}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.patch(
        url,
        product,
        config
      );

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }
      throw new APIError(
        "A problem was encountered during the request to update a product",
        422
      );
    }
  }

  /**
   * Delete an existing product.
   * @param id - The ID of the product to delete.
   * @param oauth - The OAuth token data for authentication.
   * @returns The response data confirming deletion.
   */
  async delete(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${id}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.delete(url, config);
      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }
      throw new APIError(
        "A problem was encountered during the request to delete a product",
        422
      );
    }
  }

  /**
   * Delete multiple products by their IDs.
   *
   * @param productIds - An array of product IDs to delete.
   * @param oauth - The OAuth token data for authentication (optional).
   * @returns A promise that resolves with an object containing error status and message.
   * @throws APIError if the request fails.
   */
  async deleteProducts(productIds: number[], oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/`;
      const config: any = { data: { product_ids: productIds } };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.delete(url, config);
      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }
      throw new APIError(
        "A problem was encountered during the request to delete all products",
        422
      );
    }
  }

  /**
   * Retrieve a list of variants for a specific product.
   * @param product - The product object containing the product ID.
   * @param oauth - The OAuth token data for authentication.
   * @returns A list of product variants.
   */
  async listProductVariants(product: any = {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/product/${product.id}/variants`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.get(url, config);
      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }
      throw new APIError(
        "A problem was encountered during the request to retrieve product variants",
        422
      );
    }
  }

  /**
   * Retrieve a list of options for a specific product.
   * @param product - The product object containing the product ID.
   * @param oauth - The OAuth token data for authentication.
   * @returns A list of product options.
   */
  async listProductOptions(product: {}, oauth: TokenData | null = null) {
    try {
      const defaultParams = {
        with: "values",
      };

      const url = `${this.config.apiBasePath}/api/v1/product/${product}/options`;
      const config: any = { defaultParams };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.get(url, config);
      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }
      throw new APIError(
        "A problem was encountered during the request to retrieve list of product options",
        422
      );
    }
  }
}
