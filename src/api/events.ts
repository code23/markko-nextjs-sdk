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
}
