import axios, { AxiosInstance } from 'axios';
import https from 'https';
import { MarkkoConfig } from '../types';

export interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  expires_at?: number;
}

export class AuthService {
  private config: MarkkoConfig;
  private tokenData: TokenData | null = null;
  private axiosInstance: AxiosInstance;

  constructor(config: MarkkoConfig) {
    this.config = config;

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
  }

  private isTokenExpired(): boolean {
    if (!this.tokenData?.expires_at) {
      // console.log('No token data or expiration');
      return true;
    }
    const isExpired = Date.now() >= (this.tokenData.expires_at - 30000);
    // console.log('Token expired?', isExpired, {
    //   now: Date.now(),
    //   expiresAt: this.tokenData.expires_at,
    //   timeLeft: (this.tokenData.expires_at - Date.now()) / 1000
    // });
    return isExpired;
  }

  private async requestNewToken(): Promise<TokenData> {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', this.config.clientCredentialKey);
    formData.append('client_secret', this.config.clientCredentialSecret);

    const response = await this.axiosInstance.post(
      `${this.config.apiBasePath}/oauth/token`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return {
      ...response.data,
      expires_at: Date.now() + (response.data.expires_in * 1000),
    };
  }

  private async refreshToken(refreshToken: string): Promise<TokenData> {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'refresh_token');
    formData.append('client_id', this.config.clientCredentialKey);
    formData.append('client_secret', this.config.clientCredentialSecret);
    formData.append('refresh_token', refreshToken);

    const response = await this.axiosInstance.post(
      `${this.config.apiBasePath}/oauth/token`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return {
      ...response.data,
      expires_at: Date.now() + (response.data.expires_in * 1000),
    };
  }

  async getAccessToken(): Promise<string> {
    try {
      // If we have a valid token, return it
      if (this.tokenData && !this.isTokenExpired()) {
        // console.log('Using cached token');
        return this.tokenData.access_token;
      }

      // If we have an expired token with a refresh token, try to refresh
      if (this.tokenData?.refresh_token) {
        try {
          // console.log('Attempting to refresh token');
          this.tokenData = await this.refreshToken(this.tokenData.refresh_token);
          return this.tokenData.access_token;
        } catch (error) {
          // console.warn('Token refresh failed, requesting new token');
        }
      }

      // Request a new token
      // console.log('Requesting new token');
      this.tokenData = await this.requestNewToken();
      // console.log('New token received, expires in:', this.tokenData.expires_in);
      return this.tokenData.access_token;
    } catch (error) {
      // console.error('Authentication failed:', error);
      throw error;
    }
  }
}
