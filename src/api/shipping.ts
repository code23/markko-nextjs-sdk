import { AuthService } from "../services/auth";
import { BaseAPI } from "./base";

export class ShippingServiceAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get shipping services
   *
   * @param {Array} vendorIds - Optional array of vendor IDs to filter by
   * @return {Promise<Array>} - A promise that resolves to an array of shipping services
   */
  async getShippingService(vendorIds = []) {
    try {
      // Set up params for the API call
      const params = new URLSearchParams({ is_enabled: "true" });

      // Scope by vendor IDs if provided
      //   if (vendorIds.length > 0) {
      //     params.append("in", `vendor_id,${vendorIds.join(",")}`);
      //   }

      const url = `${this.config.apiBasePath}/api/v1/shipping/services`;
      const response = await this.axiosInstance.get(url, { params });

      return response.data;
    } catch (error) {
      console.error("Error fetching shipping services:", error);
      throw error;
    }
  }

  /**
   * get shipping services Zones
   *
   * @param array $params - optional array of API parameters
   * @return collection
   */
  async getShippingZones(params = null) {
    const url = `${this.config.apiBasePath}/api/v1/shipping/zones`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }
}
