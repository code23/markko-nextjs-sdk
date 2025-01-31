import { BaseAPI } from './base';
import { AuthService, TokenData } from '../services/auth';
import { APIError } from '../types';

export class EventsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of events
   * @param params - The query parameters to filter the events
   * @param oauth - The OAuth token data
   * @returns A list of events
   */
  async list(params = {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/events`;
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
   * Get a single event
   * @param id - The ID of the event
   * @param params - The query parameters to filter the event
   * @param oauth - The OAuth token data
   * @returns A single event
   */
  async get(id: number, params = {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/events/${id}`;
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
   * Save a new event
   * @param data The event data to be saved
   * @param oauth - The OAuth token data
   * @throws {APIError} If the API request fails or returns an error
   * @returns Promise<boolean> Returns true if successful
   */
  async save(data: Record<string, any>, oauth: TokenData | null = null): Promise<boolean> {
    const url = `${this.config.apiBasePath}/api/v1/events`;
    const config: any = { data };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    const response = await this.axiosInstance.post(url, config);
    return response.data;
  }

  /**
   * Cancel an event
   * @param id - The ID of the event
   * @param data - The data to cancel the event with
   * @param oauth - The OAuth token data
   * @returns The response from the API
   */
  async cancel(id: number, data: Record<string, any>, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/events/${id}/cancel`;
    const config: any = { data };

    if (oauth) {
      config.headers = {
        'X-OAuth-Token': JSON.stringify(oauth)
      };
    }

    const response = await this.axiosInstance.delete(url, config);
    return response.data;
  }
}
