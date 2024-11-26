import { AuthService } from './services/auth';
import { MarkkoConfig } from './types';
import { VendorsAPI } from './api/vendors';

export class MarkkoSDK {
  private authService: AuthService;
  public vendors: VendorsAPI;

  constructor(config: MarkkoConfig) {
    this.authService = new AuthService(config);
    this.vendors = new VendorsAPI(config, this.authService);
  }

  async getAccessToken(): Promise<string> {
    return this.authService.getAccessToken();
  }
}

export default MarkkoSDK;
