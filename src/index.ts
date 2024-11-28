import { AuthService } from './services/auth';
import { MarkkoConfig } from './types';
import { VendorsAPI } from './api/vendors';
import { BlogsAPI } from './api/blogs';

export class MarkkoSDK {
  private authService: AuthService;
  public vendors: VendorsAPI;
  public blogs: BlogsAPI;

  constructor(config: MarkkoConfig) {
    this.authService = new AuthService(config);
    this.vendors = new VendorsAPI(config, this.authService);
    this.blogs = new BlogsAPI(config, this.authService);
  }

  async getAccessToken(): Promise<string> {
    return this.authService.getAccessToken();
  }
}

export default MarkkoSDK;
