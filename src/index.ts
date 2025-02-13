import { AuthService } from "./services/auth";
import { AuthAPI } from "./api/auth";
import { MarkkoConfig } from "./types";
import { AddressesAPI } from "./api/addresses";
import { AttributesAPI } from "./api/attributes";
import { BlogsAPI } from "./api/blogs";
import { CategoriesAPI } from "./api/categories";
import { CharitiesAPI } from "./api/charities";
import { CurrenciesAPI } from "./api/currencies";
import { DonationsAPI } from "./api/donations";
import { EventsAPI } from "./api/events";
import { MessagesAPI } from "./api/messages";
import { ProductsAPI } from "./api/products";
import { ReviewsAPI } from "./api/reviews";
import { SpecificationsAPI } from "./api/specifications";
import { SpecificationGroupsAPI } from "./api/specification-groups";
import { TagsAPI } from "./api/tags";
import { UsersAPI } from "./api/users";
import { VendorsAPI } from "./api/vendors";
import { ReferenceValuesAPI } from "./api/ReferenceValues";

export class MarkkoSDK {
  private authService: AuthService;
  public auth: AuthAPI;
  public addresses: AddressesAPI;
  public attributes: AttributesAPI;
  public blogs: BlogsAPI;
  public categories: CategoriesAPI;
  public charities: CharitiesAPI;
  public currencies: CurrenciesAPI;
  public donations: DonationsAPI;
  public events: EventsAPI;
  public messages: MessagesAPI;
  public products: ProductsAPI;
  public reviews: ReviewsAPI;
  public specifications: SpecificationsAPI;
  public specificationGroups: SpecificationGroupsAPI;
  public tags: TagsAPI;
  public users: UsersAPI;
  public vendors: VendorsAPI;
  public referenceValues : ReferenceValuesAPI;

  constructor(config: MarkkoConfig) {
    this.authService = new AuthService(config);
    this.auth = new AuthAPI(config, this.authService);
    this.addresses = new AddressesAPI(config, this.authService);
    this.attributes = new AttributesAPI(config, this.authService);
    this.blogs = new BlogsAPI(config, this.authService);
    this.categories = new CategoriesAPI(config, this.authService);
    this.charities = new CharitiesAPI(config, this.authService);
    this.currencies = new CurrenciesAPI(config, this.authService);
    this.donations = new DonationsAPI(config, this.authService);
    this.events = new EventsAPI(config, this.authService);
    this.messages = new MessagesAPI(config, this.authService);
    this.products = new ProductsAPI(config, this.authService);
    this.reviews = new ReviewsAPI(config, this.authService);
    this.specifications = new SpecificationsAPI(config, this.authService);
    this.specificationGroups = new SpecificationGroupsAPI(
      config,
      this.authService
    );
    this.tags = new TagsAPI(config, this.authService);
    this.users = new UsersAPI(config, this.authService);
    this.vendors = new VendorsAPI(config, this.authService);
    this.referenceValues = new ReferenceValuesAPI(config , this.authService)
  }

  async getAccessToken(): Promise<string> {
    return this.authService.getAccessToken();
  }
}

export default MarkkoSDK;
