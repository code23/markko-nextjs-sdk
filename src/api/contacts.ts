import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";
import { BaseAPI } from "./base";

export class ContactsAPI extends BaseAPI {
  constructor(config: any, authservice: AuthService) {
    super(config, authservice);
  }

  /**
   * Submit a contact form to the tenant
   *
   * @param data - The contact form data
   * @param oauth - The OAuth token data
   * @returns The contact form data
   */
  async submit(data: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/contact-form`;
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
        "Error attempting to submit the contact form.",
        422
      );
    }
  }

  /**
   * Submit a contact form to a vendor
   *
   * @param data - The contact form data
   * @param oauth - The OAuth token data
   * @returns The contact form data
   */
  async submitToVendor(data: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/contact-seller-form`;
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
        "Error attempting to submit the contact form.",
        422
      );
    }
  }

  /**
   * Submit repairs form
   *
   * @param data - The contact form data
   * @param oauth - The OAuth token data
   * @returns The contact form data
   */
  async submitServiceForm(data: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/contact-service-form`;
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
        "Error attempting to submit the form.",
        422
      );
    }
  }
}
