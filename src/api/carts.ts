import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";
import { BaseAPI } from "./base";

export class CartsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }
  /**
   * Add a product to the cart
   * @param params - Additional parameters such as quantity, variant ID, attributes, etc.
   * @param oauth - The OAuth token data (optional)
   * @returns The updated cart data
   * @throws APIError if the request fails or returns an error
   */
  async add(params: Record<string, any> = {}, oauth: TokenData | null = null) {
    try {
      const defaultParams = {
        quantity: 1,
        variantId: null,
        attributes: null,
        with: null,
        addonId: null,
      };

      const requestBody = { ...defaultParams, ...params };

      const url = `${this.config.apiBasePath}/api/v1/cart/add/${params.productId}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.patch(url, requestBody, config);

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
        "A problem was encountered during the request to add product into cart",
        422
      );
    }
  }

  /**
   * Apply a coupon code to the cart
   * @param params - Additional parameters such as cart group ID, extra options, etc.
   * @param oauth - The OAuth token data (optional)
   * @returns The updated cart data after applying the coupon
   * @throws APIError if the request fails or returns an error
   */
  async applyCoupon(
    params: Record<string, any> = {},
    oauth: TokenData | null = null
  ) {
    try {
      const defaultParams = {
        cart_group_id: 0,
        with: null,
      };

      const requestBody = { ...defaultParams, ...params };

      const url = `${this.config.apiBasePath}/api/v1/cart/apply-coupon/${params.code}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.patch(url, requestBody, config);

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
        "A problem was encountered during the request to apply a couppon",
        422
      );
    }
  }

  /**
   * Apply a promotion to the cart
   * @param params - Additional parameters such as cart group ID, extra options, etc.
   * @param oauth - The OAuth token data (optional)
   * @returns The updated cart data after applying the promotion
   * @throws APIError if the request fails or returns an error
   */

  async applyPromotion(
    params: Record<string, any> = {},
    oauth: TokenData | null = null
  ) {
    try {
      const defaultParams = {
        cart_group_id: 0,
        with: null,
      };

      const requestBody = { ...defaultParams, ...params };

      const url = `${this.config.apiBasePath}/api/v1/cart/apply-promotion/${params.id}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.patch(url, requestBody, config);

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
        "A problem was encountered during the request to apply promotion",
        422
      );
    }
  }

  /**
   * Delete the user's cart
   * @param oauth - The OAuth token data (optional)
   * @returns The response data after deleting the cart
   * @throws APIError if the request fails or returns an error
   */

  async delete(oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/cart`;
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
        "A problem was encountered during the request to delete a user's cart",
        422
      );
    }
  }

  /**
   * Share the cart via email
   * @param email - the recipient's email address
   * @param oauth - The OAuth token data (optional)
   * @returns The response data after sharing the cart
   * @throws APIError if the request fails or returns an error
   */
  async emailshareCode(email: string, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/cart/share`;

      const requestBody = {
        recipient_email: email,
        with: "",
      };

      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.patch(url, requestBody, config);
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
        "A problem was encountered during the request to share email address",
        422
      );
    }
  }

  /**
   * Retrieve a list of available promotions
   * @param params - The query parameters to filter promotions
   * @param oauth - The OAuth token data (optional)
   * @returns A list of promotions available on the platform
   * @throws APIError if the request fails or returns an error
   */

  async getPromotions(
    params: Record<string, any> = {},
    oauth: TokenData | null = null
  ) {
    try {
      const now = new Date().toISOString().split("T")[0];

      const defaultParams = {
        with: null,
        valid_from: `${now},<=`,
        expiry: `${now},>=`,
        active: 1,
      };

      const url = `${this.config.apiBasePath}/api/v1/promotions`;

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
        "A problem was encountered during the request to get promotion available on platform",
        422
      );
    }
  }

  /**
   * Retrieve cart details using a shared code.
   * @param code - The unique share code for the cart.
   * @param params - Additional query parameters for the request.
   * @param oauth - The OAuth token data (optional).
   * @returns The cart details associated with the provided share code.
   * @throws APIError if the request fails or returns an error.
   */
  async getViaCode(
    code: string,
    params: Record<string, any> = {},
    oauth: TokenData | null = null
  ) {
    try {
      const defaultParams = {
        with: null,
      };

      const url = `${this.config.apiBasePath}/api/v1/cart/share/${code}`;
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
        "A problem was encountered during the request to get the cart",
        422
      );
    }
  }

  /**
   * Updates the gift options for a cart.
   * @param params - Additional parameters for the request (e.g., `is_gift`, `gift_message`).
   * @param oauth - The OAuth token data (optional).
   * @returns The updated cart details after applying the gift options.
   * @throws APIError if the request fails or returns an error.
   */

  async updateGiftOptions(
    params: Record<string, any>,
    oauth: TokenData | null = null
  ) {
    try {
      const defaultParams = {
        cart_group_id: 0,
        is_gift: false,
        with: null,
        gift_message: null,
      };

      const requestBody = { ...defaultParams, ...params };
      const url = `${this.config.apiBasePath}/api/v1/cart/is-gift/`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.patch(url, requestBody, config);
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
        "A problem was encountered during the request to update gift options",
        422
      );
    }
  }

  /**
   * Removes a product from the cart.
   * @param params - Additional parameters for the request (e.g., `variant_id`, `with`).
   * @param oauth - The OAuth token data (optional).
   * @returns The updated cart details after removing the product.
   * @throws APIError if the request fails or returns an error.
   */

  async remove(
    params: Record<string, any> = {},
    oauth: TokenData | null = null
  ) {
    try {
      const defaultParams = {
        variant_id: null,
        with: null,
      };
      const requestBody = { ...defaultParams, ...params };

      const url = `${this.config.apiBasePath}/api/v1/cart/remove/${params.productId}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.patch(url, requestBody, config);
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
        "A problem was encountered during the request to remove product from cart",
        422
      );
    }
  }

  /**
   * Fetches the current user's cart details.
   * @param params - Additional parameters for the request.
   * @param oauth - The OAuth token data (optional).
   * @returns The cart details.
   * @throws APIError if the request fails or returns an error.
   */
  async get(params: Record<string, any> = {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/cart`;
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
        "A problem was encountered during the request to fetch cart",
        422
      );
    }
  }

  /**
   * Fetches cart details by its ID.
   * @param id - The cart ID to fetch.
   * @param params - Additional parameters for the request.
   * @param oauth - The OAuth token data (optional).
   * @returns The cart details.
   * @throws APIError if the request fails or returns an error.
   */
  async getById(
    id: number,
    params: Record<string, any> = {},
    oauth: TokenData | null = null
  ) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/cart/${id}`;
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
        "A problem was encountered during the request to fetch cart by Id",
        422
      );
    }
  }
  /**
   * Generates a shareable code for the user's cart.
   * @param oauth - The OAuth token data (optional).
   * @returns The shared cart code.
   * @throws APIError if the request fails or returns an error.
   */
  async getShareCode(oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/cart/share`;
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
        "A problem was encountered during the request to share the cart",
        422
      );
    }
  }

  /**
   * Updates the quantity of a product in the cart.
   * @param params - Additional parameters (optional).
   * @param oauth - The OAuth token data (optional).
   * @returns The updated cart data.
   * @throws APIError if the request fails or returns an error.
   */
  async updateQuantity(
    params: Record<string, any> = {},
    oauth: TokenData | null = null
  ) {
    try {
      const defaultParams = {
        variant_id: null,
        with: null,
        quantity: 1,
      };

      const requestBody = { ...defaultParams, ...params };
      const url = `${this.config.apiBasePath}/api/v1/cart/update-quantity/${params.productId}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }
      const response = await this.axiosInstance.patch(url, requestBody, config);
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
        "A problem was encountered during the request to update cart product quantity",
        422
      );
    }
  }
}
