import { BaseAPI } from './base';
import { AuthService } from '../services/auth';

export class AuthAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  async login(data: Record<string, any>) {
    const payload = {
      grant_type: 'password',
      client_id: this.config.passwordKey,
      client_secret: this.config.passwordSecret,
      username: data.email,
      password: data.password,
      scope: ''
    };
    const url = `${this.config.apiBasePath}/oauth/token`;
    const response = await this.axiosInstance.post(url, payload);

    return response;
  }
}
