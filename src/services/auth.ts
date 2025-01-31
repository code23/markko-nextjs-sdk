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

  private isTokenExpired(tokenData?: TokenData | null): boolean {
    if (!tokenData?.expires_at) {
      return true;
    }
    return Date.now() >= (tokenData.expires_at - 30000);
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

  async getAccessToken(externalTokenData: TokenData | null = null): Promise<string> {
    try {
      // If external token data is provided, use it
      if (externalTokenData) {
        const expiresAt = externalTokenData.expires_at || Date.now() + (externalTokenData.expires_in * 1000);
        const tokenWithExpiry = { ...externalTokenData, expires_at: expiresAt };

        // If the external token is not expired, use it
        if (!this.isTokenExpired(tokenWithExpiry)) {
          return externalTokenData.access_token;
        }

        // If external token is expired but has refresh token, try to refresh
        if (externalTokenData.refresh_token) {
          try {
            this.tokenData = await this.refreshToken(externalTokenData.refresh_token);
            return this.tokenData.access_token;
          } catch (error) {
            // Fall through to requesting new token if refresh fails
          }
        }
      }

      // Use existing token flow
      if (this.tokenData && !this.isTokenExpired(this.tokenData)) {
        return this.tokenData.access_token;
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
