import { BaseAPI } from "./base";
import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";

export class AddressesAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Create a new address
   * @param data - The data to create the address with
   * @param oauth - The OAuth token data
   * @returns The created address
   */
  async create(data: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/address`;
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
        "A problem was encountered during the request to create a new address.",
        422
      );
    }
  }

  /**
   * Delete an address
   * @param id - The ID of the address to delete
   * @param oauth - The OAuth token data
   * @returns The deleted address
   */
  async delete(id: string, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/address/${id}`;
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
        "A problem was encountered during the request to delete an address.",
        422
      );
    }
  }

  /**
   * Look up addresses by postcode
   * @param postcode - The postcode to search for
   * @param oauth - The OAuth token data
   * @returns A list of addresses matching the postcode
   */
  async findByPostcode(postcode: string, oauth: TokenData | null = null) {
    postcode = postcode.replace(/\s+/g, "");
    try {
      const url = `${this.config.apiBasePath}/api/v1/postcode/lookup`;
      const config: any = { params: { postcode } };

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
        "A problem was encountered during the request to find an address by postcode",
        422
      );
    }
  }

  /**
   * Address lookup
   * @param search - The search term to search for
   * @param oauth - The OAuth token data
   * @returns A list of addresses matching the search term
   */
  async lookup(search: string, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/postcode/lookup`;
      const config: any = { params: { postcode: search } };

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
        "A problem was encountered during the address lookup",
        422
      );
    }
  }

  /**
   * Get a list of nearby models by postcode
   * @param postcode - The postcode to search for
   * @param model - The model to search for
   * @param radius - The radius to search within
   * @param limit - The maximum number of results to return
   * @param relationships - Relationships to load (with)
   * @param oauth - The OAuth token data
   * @returns A list of nearby models
   */
  async getNearbyModel(
    postcode: string,
    model: string,
    radius = 10,
    limit = 10,
    relationships = null,
    oauth: TokenData | null = null
  ) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/postcode/nearby`;
      const config: any = {
        params: {
          postcode,
          model,
          radius,
          limit,
          with: relationships,
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
        "A problem was encountered during the request to find nearby models by postcode",
        422
      );
    }
  }

  /**
   * Set an address as the default
   * @param id - The ID of the address to set as default
   * @param oauth - The OAuth token data
   * @returns The updated address
   */
  async setDefault(id: string, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/address/${id}/make-default`;
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
        "A problem was encountered during the request to set an address to default",
        422
      );
    }
  }

  /**
   * Update an address
   * @param id - The ID of the address to update
   * @param data - The data to update the address with
   * @param oauth - The OAuth token data
   * @returns The updated address
   */
  async update(
    id: string,
    data: Record<string, any>,
    oauth: TokenData | null = null
  ) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/address/${id}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.patch(url, data, config);

      // Check if the response contains an error
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
        "A problem was encountered during the request to update an address.",
        422
      );
    }
  }
}
