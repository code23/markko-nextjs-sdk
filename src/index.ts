import { AuthService } from './services/auth';
import { MarkkoConfig } from './types';
import { AddressesAPI } from './api/addresses';
import { AttributesAPI } from './api/attributes';
import { BlogsAPI } from './api/blogs';
import { CharitiesAPI } from './api/charities';
import { DonationsAPI } from './api/donations';
import { TagsAPI } from './api/tags';
import { VendorsAPI } from './api/vendors';

export class MarkkoSDK {
  private authService: AuthService;
  public addresses: AddressesAPI;
  public attributes: AttributesAPI;
  public blogs: BlogsAPI;
  public charities : CharitiesAPI;
  public donations: DonationsAPI;
  public tags: TagsAPI;
  public vendors: VendorsAPI;

  constructor(config: MarkkoConfig) {
    this.authService = new AuthService(config);
    this.addresses = new AddressesAPI(config, this.authService);
    this.attributes = new AttributesAPI(config, this.authService);
    this.blogs = new BlogsAPI(config, this.authService);
    this.charities = new CharitiesAPI(config , this.authService)
    this.donations = new DonationsAPI(config, this.authService);
    this.tags = new TagsAPI(config, this.authService);
    this.vendors = new VendorsAPI(config, this.authService);
  }

  async getAccessToken(): Promise<string> {
    return this.authService.getAccessToken();
  }
}

export default MarkkoSDK;
