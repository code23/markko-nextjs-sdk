import { BaseAPI } from "./base";
import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";

export class DonationsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * @param params - The query parameters to filter the donation
   * @param oauth - The OAuth token data
   * @returns A list of Donations
   */
  async list(params = [], oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/donations`;
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
        "A problem was encountered during the request to retrieve donation.",
        422
      );
    }
  }

  /**
   * Get a donation by numbers
   * @param number - The donation number to filter by
   * @param params - The query parameters to filter the donation by number
   * @param oauth - The OAuth token data
   * @returns A donation
   */
  async getByNumber(
    number: string,
    params = [],
    oauth: TokenData | null = null
  ) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/donations/number/${number}`;
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
        "A problem was encountered during the request to create a fetch donation by number.",
        422
      );
    }
  }

  /**
   * Process a payment for a specific charity
   * @param id - The ID of the charity to donate to
   * @param data - An object containing the donation details, such as amount, donor information, etc.
   * @param oauth - The OAuth token data
   * @returns A Promise that resolves to the donation response data
   */
  async save(
    id: string,
    data: Record<string, any>,
    oauth: TokenData | null = null
  ) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/charities/${id}/donate`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.post(url, data, config);

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
}
