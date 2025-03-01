import { BaseAPI } from "./base";
import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";

export class OrdersAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of authenticated user's booking orders
   * @param params - The query parameters to filter the booking orders
   * @param oauth - The OAuth token data
   * @returns A list of orders
   */
  async bookingOrderslist(params = {}, oauth: TokenData | null = null) {
    try {
      const defaultParams = {
        with: "currency",
        sort: "created_at,desc",
        paginate: 10
      };
      const url = `${this.config.apiBasePath}/api/v1/booking-calendar/bookings`;
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
        "A problem was encountered during the request to fetch booking orders.",
        422
      );
    }
  }

  /**
   * Download an invoice relating to an order
   * @param id - The ID of the invoice
   * @param params - The query parameters to filter the invoice
   * @param oauth - The OAuth token data
   * @returns Downloadable invoice
   */
  async downloadInvoiceById(id: number, params = {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/invoices/${id}/download`;
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
        "Unable to retrieve the invoice requested!",
        422
      );
    }
  }

  /**
   * Get a order by id
   * @param id - The ID of the order
   * @param params - The query parameters to filter the order
   * @param oauth - The OAuth token data
   * @returns A single order
   */
  async get(id: number, params = {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/orders/${id}`;
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
        "A problem was encountered during the request to fetch order by id.",
        422
      );
    }
  }

  /**
   * Get a single Order by order number
   * @param orderNumber - The order number
   * @param params - The query parameters to filter the order data
   * @param oauth - The OAuth token data
   * @returns A single order
   */
  async getByNumberByCustomer(orderNumber: string, params = {}, oauth: TokenData | null = null) {
    try {
      const defaultParams = {
        with: `currency,transaction,order_groups.vendor,order_groups.files,shipping_address,billing_address,invoice.files,charity`
      };
      const url = `${this.config.apiBasePath}/api/v1/orders/customer/number/${orderNumber}`;
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
        "A problem was encountered during the request to fetch order by order number.",
        422
      );
    }
  }

  /**
   * Get a list of authenticated user's orders
   * @param params - The query parameters to filter the orders
   * @param oauth - The OAuth token data
   * @returns A list of orders
   */
  async list(params = {}, oauth: TokenData | null = null) {
    try {
      const defaultParams = {
        with: "product.images,currency",
        sort: "created_at,desc",
        paginate: 10
      };
      const url = `${this.config.apiBasePath}/api/v1/orders/customer`;
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
        "A problem was encountered during the request to fetch list of orders.",
        422
      );
    }
  }
}
