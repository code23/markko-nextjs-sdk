import { AuthService } from './services/auth';
import { MarkkoConfig } from './types';
import { AddressesAPI } from './api/addresses';
import { AttributesAPI } from './api/attributes';
import { BlogsAPI } from './api/blogs';
import { VendorsAPI } from './api/vendors';
import { CharitiesAPI } from './api/charities';

export class MarkkoSDK {
  private authService: AuthService;
  public addresses: AddressesAPI;
  public attributes: AttributesAPI;
  public blogs: BlogsAPI;
  public vendors: VendorsAPI;
  public charities : CharitiesAPI;

  constructor(config: MarkkoConfig) {
    this.authService = new AuthService(config);
    this.addresses = new AddressesAPI(config, this.authService);
    this.attributes = new AttributesAPI(config, this.authService);
    this.blogs = new BlogsAPI(config, this.authService);
    this.vendors = new VendorsAPI(config, this.authService);
    this.charities = new CharitiesAPI(config , this.authService)
  }

  async getAccessToken(): Promise<string> {
    return this.authService.getAccessToken();
  }
}

export default MarkkoSDK;
