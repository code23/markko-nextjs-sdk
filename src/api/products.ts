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

  async countProducts(params: {}, oauth: TokenData | null = null) {
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
  async createProduct(
    product: Record<string, any>,
    oauth: TokenData | null = null
  ) {
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
    params: { product: {} },
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
        params.product,
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

  /**
   * Save or update a product variant.
   * @param productId - The ID of the product.
   * @param variant - The variant object containing variant details.
   * @param oauth - The OAuth token data for authentication.
   * @returns The saved variant data.
   */
  async saveProductVariant(
    productId: number,
    variant: any = {},
    oauth: TokenData | null = null
  ) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/product/${productId}/variants/${variant.id}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.patch(url, variant, config);
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
        "A problem was encountered during the request to save product variant",
        422
      );
    }
  }

  /**
   * Save or update an upsell for a product.
   * @param productId - The ID of the product.
   * @param upsell - The upsell object containing upsell details.
   * @param oauth - The OAuth token data for authentication.
   * @returns The saved upsell data.
   */
  async saveProductUpSells(
    productId: number,
    upsell: any = {},
    oauth: TokenData | null = null
  ) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${productId}/up-sells/${upsell.id}/add`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.post(url, upsell, config);
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
        "A problem was encountered during the request to save product upsells",
        422
      );
    }
  }
  /**
   * Save or update a cross-sell for a product.
   * @param productId - The ID of the product.
   * @param upsell - The upsell object containing cross-sell details.
   * @param discount - The discount amount for the cross-sell.
   * @param is_percent - Whether the discount is in percentage format ("true" or "false").
   * @param oauth - The OAuth token data for authentication.
   * @returns The saved cross-sell data.
   */
  async saveProductCrossSells(
    productId: number,
    upsell: any = {},
    discount: number,
    is_percent: boolean,
    oauth: TokenData | null = null
  ) {
    try {
      const requestBody = { upsell, discount, is_percent };
      const url = `${this.config.apiBasePath}/api/v1/products/${productId}/cross-sells/${upsell.id}/add`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.post(url, requestBody, config);
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
        "A problem was encountered during the request to save product cross sells",
        422
      );
    }
  }

  /**
   * Approves a product by its ID.
   * @param id - The ID of the product to approve.
   * @param oauth - The OAuth token data for authentication.
   * @returns The response data after approving the product.
   */
  async approveProduct(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${id}/approve`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.patch(url, {}, config);
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
        "A problem was encountered during the request to approve product",
        422
      );
    }
  }

  /**
   * Approves multiple products based on the provided parameters.
   * @param params - The parameters to filter which products to approve.
   * @param oauth - The OAuth token data for authentication.
   * @returns The response data after approving the products.
   */
  async approveAllProducts(params: {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/approve`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.patch(url, params, config);
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
        "A problem was encountered during the request to approve all  products",
        422
      );
    }
  }

  /**
   * Rejects a product by its ID.
   * @param id - The product ID to be rejected.
   * @param oauth - The OAuth token data for authentication.
   * @returns The response data after rejecting the product.
   */
  async rejectProduct(id: number, params: {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${id}/reject`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.patch(url, params, config);
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
        "A problem was encountered during the request to reject a  product",
        422
      );
    }
  }

  /**
   * Rejects all products based on the given parameters.
   * @param params - The parameters for filtering products to reject.
   * @param oauth - The OAuth token data for authentication.
   * @returns The response data after rejecting the products.
   */
  async rejectAllProducts(params: {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/reject`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.patch(url, params, config);
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
        "A problem was encountered during the request to reject all products",
        422
      );
    }
  }

  /**
   * Enables cross-sells for a given product.
   * @param id - The product ID.
   * @param oauth - The OAuth token data for authentication (optional).
   * @returns The response data after enabling cross-sells.
   * @throws APIError if the request fails.
   */
  async enableProductCrossSells(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${id}/cross-sells/enable`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.patch(url, {}, config);
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
        "A problem was encountered during the request to enable product cross sells",
        422
      );
    }
  }

  /**
   * Enables up-sells for a given product.
   * @param id - The product ID.
   * @param oauth - The OAuth token data for authentication (optional).
   * @returns The response data after enabling up-sells.
   * @throws APIError if the request fails.
   */
  async enableProductUpSells(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${id}/up-sells/enable`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.patch(url, {}, config);
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
        "A problem was encountered during the request to enable product up-sells",
        422
      );
    }
  }

  /**
   * Disables up-sells for a given product.
   * @param id - The product ID.
   * @param oauth - The OAuth token data for authentication (optional).
   * @returns The response data after disabling up-sells.
   * @throws APIError if the request fails.
   */
  async disableProductUpSells(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${id}/up-sells/disable`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.patch(url, {}, config);
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
        "A problem was encountered during the request to disable product up-sells",
        422
      );
    }
  }

  /**
   * Disables cross-sells for a given product.
   * @param id - The product ID.
   * @param oauth - The OAuth token data for authentication (optional).
   * @returns The response data after disabling cross-sells.
   * @throws APIError if the request fails.
   */
  async disableProductCrossSells(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${id}/cross-sells/disable`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.patch(url, {}, config);
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
        "A problem was encountered during the request to disable product cross sells",
        422
      );
    }
  }

  /**
   * Syncs data to Google Marketplace.
   * @param oauth - The OAuth token data for authentication (optional).
   * @returns The response data after syncing to Google Marketplace.
   * @throws APIError if the request fails.
   */
  async syncToGoogleMarketplace(oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/integrations/google/push`;
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
        "A problem was encountered during the request to sync to google marketplace",
        422
      );
    }
  }

  /**
   * Deletes a cross-sell relationship for a product.
   * @param params - Contains `productId` and `upsell.id` (IDs of the product and cross-sell item).
   * @param oauth - The OAuth token data for authentication (optional).
   * @returns The response data after deleting the cross-sell.
   * @throws APIError if the request fails.
   */

  async deleteProductCrossSell(
    params: any = {},
    oauth: TokenData | null = null
  ) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${params.productId}/cross-sells/${params.upsell.id}/remove`;
      const config: any = { params };

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
        "A problem was encountered during the request to delete product cross sell",
        422
      );
    }
  }

  /**
   * Deletes an up-sell relationship for a product.
   * @param params - Contains `productId` and `upsell.id` (IDs of the product and up-sell item).
   * @param oauth - The OAuth token data for authentication (optional).
   * @returns The response data after deleting the up-sell.
   * @throws APIError if the request fails.
   */
  async deleteProductUpSell(params: any = {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${params.productId}/up-sells/${params.upsell.id}/remove`;
      const config: any = { params };

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
        "A problem was encountered during the request to delete product  up-sells",
        422
      );
    }
  }

  /**
   * Reorders the up-sell products for a given product.
   * @param params - Contains `ordered_up_sells` (list of up-sell product IDs) and `productId`.
   * @param oauth - The OAuth token data for authentication (optional).
   * @returns The response data after reordering the up-sells.
   * @throws APIError if the request fails.
   */
  async reorderProductUpSells(
    params: { ordered_up_sells: number; productId: number },
    oauth: TokenData | null = null
  ) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${params.productId}/up-sells/reorder`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.patch(
        url,
        params.ordered_up_sells,
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
        "A problem was encountered during the request to reorder product up-sells",
        422
      );
    }
  }

  /**
   * Reorders the cross-sell products for a given product.
   * @param params - Contains `ordered_cross_sells` (list of cross-sell product IDs) and `productId`.
   * @param oauth - The OAuth token data for authentication (optional).
   * @returns The response data after reordering the cross-sells.
   * @throws APIError if the request fails.
   */
  async reorderProductCrossSells(
    params: { ordered_cross_sells: number; productId: number },
    oauth: TokenData | null = null
  ) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/products/${params.productId}/cross-sells/reorder`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.patch(
        url,
        params.ordered_cross_sells,
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
        "A problem was encountered during the request to reorder product cross sells",
        422
      );
    }
  }
}
