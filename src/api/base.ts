import axios, { AxiosInstance } from 'axios';
import https from 'https';
import { MarkkoConfig } from '../types';
import { AuthService } from '../services/auth';

export class BaseAPI {
  protected config: MarkkoConfig;
  protected axiosInstance: AxiosInstance;
  protected authService: AuthService;

  constructor(config: MarkkoConfig, authService: AuthService) {
    this.config = config;
    this.authService = authService;

    const axiosConfig: any = {
      headers: {
        'X-MPE-Origin': this.config.origin
      }
    };

    // Only disable SSL verification in development
    if (config.isDevelopment) {
      axiosConfig.httpsAgent = new https.Agent({
        rejectUnauthorized: false
      });
    }

    this.axiosInstance = axios.create(axiosConfig);

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // Get the oauth token from config if it exists
        const oauthToken = config.headers?.['X-OAuth-Token'];

        if (oauthToken) {
          // Remove the temporary header
          delete config.headers['X-OAuth-Token'];
          // Use the provided token data
          const token = await this.authService.getAccessToken(JSON.parse(oauthToken));
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          // Get a new token as before
          const token = await this.authService.getAccessToken(null);
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
