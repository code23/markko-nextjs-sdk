import { BaseAPI } from "./base";
import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";

export class VendorsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of vendors
   * @param params - The query parameters to filter the vendors
   * @param oauth - The OAuth token data
   * @returns A list of vendors
   */
  async list(params = {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/vendors`;
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
        "A problem was encountered during the request to retrieve list of vendors.",
        422
      );
    }
  }

  /**
   * Get a list of vendors by postcode
   * @param postcode - The postcode to filter the vendors
   * @param params - The query parameters to filter the vendors
   * @param oauth - The OAuth token data
   * @returns A list of vendors
   */
  async listByPostcode(
    postcode: string,
    params = {},
    oauth: TokenData | null = null
  ) {
    try {
      const defaultParams = {
        is_active: 1,
      };
      postcode = postcode.replace(/\s+/g, "");
      const url = `${this.config.apiBasePath}/api/v1/vendors/postcode/${postcode}`;
      const config: any = { params: { ...defaultParams, ...params } };

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
        "A problem was encountered during the request to retrieve list of vendors by postcode.",
        422
      );
    }
  }

  /**
   * Get a single vendor
   * @param id - The ID of the vendor
   * @param params - The query parameters to filter the vendor
   * @param oauth - The OAuth token data
   * @returns A single vendor
   */
  async get(id: number, params = {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/vendors/${id}`;
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
        "A problem was encountered during the request to retrieve a single vendor.",
        422
      );
    }
  }

  /**
   * Get a single vendor by slug
   * @param slug - The slug of the vendor
   * @param params - The query parameters to filter the vendor
   * @param oauth - The OAuth token data
   * @returns A single vendor
   */
  async getBySlug(slug: string, params = {}, oauth: TokenData | null = null) {
    try {
      const defaultParams = {
        is_active: 1,
      };
      const config: any = { params: { ...defaultParams, ...params } };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const url = `${this.config.apiBasePath}/api/v1/vendors/slug/${slug}`;
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
        "A problem was encountered during the request to retrieve single vendor by slug.",
        422
      );
    }
  }

  /**
   * Save a new vendor
   * @param data The vendor data to be saved
   * @param oauth - The OAuth token data
   * @throws {APIError} If the API request fails or returns an error
   * @returns Promise<boolean> Returns true if successful
   */
  async save(
    data: Record<string, any>,
    oauth: TokenData | null = null
  ): Promise<boolean> {
    try {
      const url = `${this.config.apiBasePath}/api/v1/vendors/register`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.post(url, data, config);

      // Check if the response contains an error
      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return true;
    } catch (error: any) {
      // If it's an axios error with a response
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      // For any other type of error
      throw new APIError(
        "A problem was encountered during the request to create a new user & vendor.",
        422
      );
    }
  }

  /**
   * Follow a vendor
   * @param id - The ID of the vendor
   * @param oauth - The OAuth token data
   * @returns A single vendor
   */
  async follow(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/vendors/${id}/follow`;
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
        "A problem was encountered during the request to follow a vendor.",
        422
      );
    }
  }

  /**
   * Unfollow a vendor
   * @param id - The ID of the vendor
   * @param oauth - The OAuth token data
   * @returns A single vendor
   */
  async unfollow(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/vendors/${id}/unfollow`;
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
        "A problem was encountered during the request to unfollow a vendor.",
        422
      );
    }
  }

  /**
   * Check if a vendor (store) name is unique
   * @param name - The vendor (store) name to check
   * @param oauth - The OAuth token data
   * @returns A boolean indicating if the vendor (store) name is unique
   */
  async isStoreNameUnique(name: string, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/vendors/is-store-name-unique`;
      const config: any = { params: { store_name: name } };

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
        "A problem was encountered during the request to check if vendor name is unique.",
        422
      );
    }
  }

  /**
   * Update a vendor
   * @param id - The ID of the vendor
   * @param data - The vendor data to be updated
   * @param oauth - The OAuth token data
   * @returns A single vendor
   */
  async update(
    id: number,
    data: Record<string, any>,
    oauth: TokenData | null = null
  ) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/vendors/${id}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.patch(url, data, config);

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
        "A problem was encountered during the request to update a vendor.",
        422
      );
    }
  }

  /**
   * Delete a vendor
   * @param id - The ID of the vendor
   * @param oauth - The OAuth token data
   * @returns A single vendor
   */
  async delete(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/vendors/${id}`;
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
        "A problem was encountered during the request to delete a vendor.",
        422
      );
    }
  }
}
