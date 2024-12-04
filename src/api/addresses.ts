import { BaseAPI } from './base';
import { AuthService } from '../services/auth';
import { APIError } from '../types';

export class AddressesAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Create a new address
   * @param data - The data to create the address with
   * @returns The created address
   */
  async create(data: Record<string, any>) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/address`;
      const response = await this.axiosInstance.post(url, data);

      // Check if the response contains an error
      if (response.data?.error) {
        throw new APIError(response.data.message, response.data.code);
      }

      return response.data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      } else {
        throw new APIError(
          'A problem was encountered during the request to create a new address.',
          422
        );
      }
    }
  }

  /**
   * Delete an address
   * @param id - The ID of the address to delete
   * @returns The deleted address
   */
  async delete(id: string) {
    const url = `${this.config.apiBasePath}/api/v1/address/${id}`;
    const response = await this.axiosInstance.delete(url);
    return response.data;
  }

  /**
   * Look up addresses by postcode
   * @param postcode - The postcode to search for
   * @returns A list of addresses matching the postcode
   */
  async findByPostcode(postcode: string) {
    postcode = postcode.replace(/\s+/g, '');
    const url = `${this.config.apiBasePath}/api/v1/postcode/lookup`;
    const response = await this.axiosInstance.get(url, { params: { postcode } });
    return response.data;
  }

  /**
   * Get a list of nearby models by postcode
   * @param postcode - The postcode to search for
   * @param model - The model to search for
   * @param radius - The radius to search within
   * @param limit - The maximum number of results to return
   * @param relationships - Relationships to load (with)
   * @returns A list of nearby models
   */
  async getNearbyModel(postcode: string, model: string, radius = 10, limit = 10, relationships = null) {
    const url = `${this.config.apiBasePath}/api/v1/postcode/nearby`;
    const response = await this.axiosInstance.get(url, {
      params: {
        postcode,
        model,
        radius,
        limit,
        with: relationships
      }
    });
    return response.data;
  }


  /**
   * Set an address as the default
   * @param id - The ID of the address to set as default
   * @returns The updated address
   */
  async setDefault(id: string) {
    const url = `${this.config.apiBasePath}/api/v1/address/${id}/make-default`;
    const response = await this.axiosInstance.patch(url);
    return response.data;
  }

  /**
   * Update an address
   * @param id - The ID of the address to update
   * @param data - The data to update the address with
   * @returns The updated address
   */
  async update(id: string, data: Record<string, any>) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/address/${id}`;
      const response = await this.axiosInstance.patch(url, data);

      // Check if the response contains an error
      if (response.data?.error) {
        throw new APIError(response.data.message, response.data.code);
      }

      return response.data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      } else {
        throw new APIError('A problem was encountered during the request to update an address.', 422);
      }
    }
  }
}
