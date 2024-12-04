import { AuthService } from './services/auth';
import { MarkkoConfig } from './types';
import { AddressesAPI } from './api/addresses';
import { BlogsAPI } from './api/blogs';
import { VendorsAPI } from './api/vendors';

export class MarkkoSDK {
  private authService: AuthService;
  public addresses: AddressesAPI;
  public blogs: BlogsAPI;
  public vendors: VendorsAPI;

  constructor(config: MarkkoConfig) {
    this.authService = new AuthService(config);
    this.addresses = new AddressesAPI(config, this.authService);
    this.blogs = new BlogsAPI(config, this.authService);
    this.vendors = new VendorsAPI(config, this.authService);
  }

  async getAccessToken(): Promise<string> {
    return this.authService.getAccessToken();
  }
}

export default MarkkoSDK;
