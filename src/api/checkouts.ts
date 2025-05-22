import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";
import { BaseAPI } from "./base";

export class CheckoutsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Update the checkout details (step 1)
   * @param data - The data to update the checkout details
   * @param oauth - The OAuth token data
   * @returns The updated cart
   */
  async details(data: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/checkout/details`;
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
          error.response.data.code,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to update checkout details.",
        422
      );
    }
  }

  /**
   * Update the shipping service (step 2)
   * @param data - The data to update the shipping service
   * @param oauth - The OAuth token data
   * @returns The updated cart
   */
  async shipping(data: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/checkout/shipping`;
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
          error.response.data.code,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to update shipping service.",
        422
      );
    }
  }

  /**
   * Process payment (step 3)
   * @param data - The data to process the payment
   * @param oauth - The OAuth token data
   * @returns The updated cart
   */
  async payment(data: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/checkout/payment`;
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
          error.response.data.code,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to process the payment.",
        422
      );
    }
  }

  /**
   * Create a payment intent
   * @param data - The data to create the payment intent
   * @param oauth - The OAuth token data
   * @returns The payment intent
   */
  async createPaymentIntent(data: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/settings/gateway/stripe/customers/payment-intent`;
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
          error.response.data.code,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to create a payment intent.",
        422
      );
    }
  }
}
