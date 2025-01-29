import { AuthService } from "../services/auth";
import { BaseAPI } from "./base";

export class DonationsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a donation by numbers
   * @param number - The donation number to filter by
   * @param params - The query parameters to filter the donation by number
   * @returns A donation
   */
  async getByNumber(number: string, params = []) {
    const url = `${this.config.apiBasePath}/api/v1/donations/number/${number}`;
    const response = await this.axiosInstance.get(url, { params: params });
    return response.data;
  }

  /**
   * @param params - The query parameters to filter the donation
   * @returns A list of Donations
   */
  async list(params = []) {
    const url = `${this.config.apiBasePath}/api/v1/donations`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

  /**
   * Process a payment for a specific charity
   * @param id - The ID of the charity to donate to
   * @param data - An object containing the donation details, such as amount, donor information, etc.
   * @returns A Promise that resolves to the donation response data
   */
  async save(id: string, data: Record<string, any>) {
    const url = `${this.config.apiBasePath}/api/v1/charities/${id}/donate`;
    const response = await this.axiosInstance.post(url, data);
    const responseData = response.data;
    return responseData.data || {};
  }
}
