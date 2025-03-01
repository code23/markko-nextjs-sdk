import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";
import { BaseAPI } from "./base";

export class CartsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }
  /**
   * Add a product to the cart
   * @param productId - The ID of the product to add
   * @param params - Additional parameters such as quantity, variant ID, attributes, etc.
   * @param oauth - The OAuth token data (optional)
   * @returns The updated cart data
   * @throws APIError if the request fails or returns an error
   */
  async add(productId: number, params: {}, oauth: TokenData | null = null) {
    try {
      const defaultParams = {
        quantity: 1,
        variantId: null,
        attributes: null,
        with: null,
        addonId: null,
      };
      const url = `${this.config.apiBasePath}/api/v1/cart/add/${productId}`;
      const config: any = { params: { ...defaultParams, ...params } };

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

      if (response.data?.data?.id) {
        localStorage.setItem("cart_id", response.data.data.id.toString());
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
   * @param code - The coupon code to apply
   * @param params - Additional parameters such as cart group ID, extra options, etc.
   * @param oauth - The OAuth token data (optional)
   * @returns The updated cart data after applying the coupon
   * @throws APIError if the request fails or returns an error
   */
  async applyCoupon(code: string, params: {}, oauth: TokenData | null = null) {
    try {
      const defaultParams = {
        cart_group_id: 0,
        with: null,
      };

      const url = `${this.config.apiBasePath}/api/v1/cart/apply-coupon/${code}`;
      const config: any = { params: { ...defaultParams, ...params } };

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
        "A problem was encountered during the request to apply a cuppon",
        422
      );
    }
  }

  /**
   * Apply a promotion to the cart
   * @param id - The promotion ID to apply
   * @param params - Additional parameters such as cart group ID, extra options, etc.
   * @param oauth - The OAuth token data (optional)
   * @returns The updated cart data after applying the promotion
   * @throws APIError if the request fails or returns an error
   */

  async applyPromotion(id: string, params: {}, oauth: TokenData | null = null) {
    try {
      const defaultParams = {
        cart_group_id: 0,
        with: null,
      };

      const url = `${this.config.apiBasePath}/api/v1/cart/apply-promotion/${id}`;
      const config: any = { params: { ...defaultParams, ...params } };

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
   * @param params - An object containing the recipient's email address
   * @param oauth - The OAuth token data (optional)
   * @returns The response data after sharing the cart
   * @throws APIError if the request fails or returns an error
   */
  async emailshareCode(
    params: { email: string },
    oauth: TokenData | null = null
  ) {
    try {
      const defaultParams = {
        with: null,
      };
      const url = `${this.config.apiBasePath}/api/v1/cart/share`;
      const config: any = { params: { ...defaultParams, ...params } };

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

  async getPromotions(params: {}, oauth: TokenData | null = null) {
    try {
      const defaultParams = {
        with: null,
        valid_from: `${new Date().toISOString()},<=`,
        expiry: `${new Date().toISOString()},>=`,
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
  async getViaCode(code: string, params: {}, oauth: TokenData | null = null) {
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

  async updateGiftOptions(params: {}, oauth: TokenData | null = null) {
    try {
      const defaultParams = {
        cart_group_id: 0,
        is_gift: false,
        gift_message: null,
        with: null,
      };
      const url = `${this.config.apiBasePath}/api/v1/cart/is-gift/`;
      const config: any = { params: { ...defaultParams, ...params } };

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
        "A problem was encountered during the request to update gift options",
        422
      );
    }
  }

  /**
   * Removes a product from the cart.
   * @param productId - The ID of the product to be removed.
   * @param params - Additional parameters for the request (e.g., `variant_id`, `with`).
   * @param oauth - The OAuth token data (optional).
   * @returns The updated cart details after removing the product.
   * @throws APIError if the request fails or returns an error.
   */

  async remove(productId: number, params: {}, oauth: TokenData | null = null) {
    try {
      const defaultParams = {
        variant_id: null,
        with: null,
      };

      const url = `${this.config.apiBasePath}/api/v1/cart/remove/${productId}`;
      const config: any = { params: { ...defaultParams, ...params } };

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
  async get(params: {}, oauth: TokenData | null = null) {
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
  async getById(id: number, params: {}, oauth: TokenData | null = null) {
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
   * @param productId - The ID of the product.
   * @param params - Additional parameters (optional).
   * @param oauth - The OAuth token data (optional).
   * @returns The updated cart data.
   * @throws APIError if the request fails or returns an error.
   */
  async updateQuantity(
    productId: string,
    params: {},
    oauth: TokenData | null = null
  ) {
    try {
      const defaultParams = {
        variant_id: null,
        with: null,
        quantity: 1,
      };

      const url = `${this.config.apiBasePath}/api/v1/cart/update-quantity/${productId}`;
      const config: any = { params: { ...defaultParams, ...params } };

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
        "A problem was encountered during the request to update cart product quantity",
        422
      );
    }
  }
}
