import { BaseAPI } from "./base";
import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";

export class AuthAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Logs in a user.
   * @param data - Object containing the login data
   * @returns Promise with the API response
   */
  async login(data: Record<string, any>) {
    try {
      const payload = {
        grant_type: "password",
        client_id: this.config.passwordKey,
        client_secret: this.config.passwordSecret,
        username: data.email,
        password: data.password,
        scope: "",
      };
      const url = `${this.config.apiBasePath}/oauth/token`;
      const response = await this.axiosInstance.post(url, payload);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to login a user.",
        422
      );
    }
  }

  /**
   * Logs out the current user.
   * @param oauth - The OAuth token data
   * @returns Promise with the API response
   */
  async logout(oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/auth/logout`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.post(url, {}, config);

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
        "A problem was encountered during the logout request.",
        422
      );
    }
  }

  /**
   * Request a password reset link for a user.
   * @param email - The email address of the user.
   * @returns Promise with the API response.
   */
  async resetPasswordLinkRequest(email: string) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/auth/forgot-password`;
      const response = await this.axiosInstance.post(url, { email });

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to reset password link request.",
        422
      );
    }
  }

  /**
   * Update a user's password.
   * @param data - Object containing the email, new password, password confirmation and the reset token (email, password, password_confirmation, token).
   * @returns Promise with the API response.
   */
  async updatePassword(data: Record<string, any>) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/auth/reset-password`;
      const response = await this.axiosInstance.post(url, data);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to update password.",
        422
      );
    }
  }
}
