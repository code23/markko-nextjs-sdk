import { BaseAPI } from "./base";
import { AuthService, TokenData } from "../services/auth";

export class DonationsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a donation by numbers
   * @param number - The donation number to filter by
   * @param params - The query parameters to filter the donation by number
   * @param oauth - The OAuth token data
   * @returns A donation
   */
  async getByNumber(number: string, params = [], oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/donations/number/${number}`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * @param params - The query parameters to filter the donation
   * @param oauth - The OAuth token data
   * @returns A list of Donations
   */
  async list(params = [], oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/donations`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Process a payment for a specific charity
   * @param id - The ID of the charity to donate to
   * @param data - An object containing the donation details, such as amount, donor information, etc.
   * @param oauth - The OAuth token data
   * @returns A Promise that resolves to the donation response data
   */
  async save(id: string, data: Record<string, any>, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/charities/${id}/donate`;
    const config: any = { data };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    const response = await this.axiosInstance.post(url, data, config);
    const responseData = response.data;
    return responseData.data || {};
  }
}
