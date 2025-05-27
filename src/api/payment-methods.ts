import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";
import { BaseAPI } from "./base";

export class PaymentMethodsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get Stripe API key.
   * @param oauth - The OAuth token data.
   * @returns The Stripe API key.
   */
  async getStripeApiKey(oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/settings/gateway/stripe/keys`;
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
      return response.data?.data?.publishable_key || null;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to get the Stripe API key.",
        422
      );
    }
  }

  /**
   * Get the setup intent.
   * @param data - The data to get the setup intent.
   * @param oauth - The OAuth token data.
   * @returns The setup intent.
   */
  async getSetupIntent(data: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/settings/gateway/stripe/customers/setup-intent`;
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
        "A problem was encountered during the request to get the setup intent.",
        422
      );
    }
  }

  /**
   * List the payment methods for the customer.
   * @param oauth - The OAuth token data.
   * @returns The payment methods.
   */
  async list(oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/settings/gateway/stripe/customers/payment-methods/list`;
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
        "A problem was encountered during the request to retrieve the payment methods.",
        422
      );
    }
  }

  /**
   * Add a payment method to the customer.
   * @param data - The data to add the payment method.
   * @param oauth - The OAuth token data.
   * @returns The payment method.
   */
  async add(data: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/settings/gateway/stripe/customers/payment-methods/add`;
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
        "A problem was encountered during the request to add a payment method.",
        422
      );
    }
  }

  /**
   * Delete a payment method from the customer.
   * @param data - The data to delete the payment method. Must contain the 'payment_method' key.
   * @param oauth - The OAuth token data.
   * @returns The payment method.
   */
  async delete(data: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/settings/gateway/stripe/customers/payment-methods/delete`;
      const config: any = { data };

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
        "A problem was encountered during the request to delete the payment method.",
        422
      );
    }
  }

  /**
   * Set the default payment method for the customer.
   * @param data - The data to set the default payment method.
   * @param oauth - The OAuth token data.
   * @returns The payment method.
   */
  async setDefault(data: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/settings/gateway/stripe/customers/payment-methods/update-default`;
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
        "A problem was encountered during the request to set the default payment method.",
        422
      );
    }
  }
}
