import { AuthService } from "./services/auth";
import { AuthAPI } from "./api/auth";
import { MarkkoConfig } from "./types";
import { AddressesAPI } from "./api/addresses";
import { AttributesAPI } from "./api/attributes";
import { BlogsAPI } from "./api/blogs";
import { CartsAPI } from "./api/carts";
import { CategoriesAPI } from "./api/categories";
import { CharitiesAPI } from "./api/charities";
import { CheckoutsAPI } from "./api/checkouts";
import { CommissionsAPI } from "./api/commissions";
import { ContactsAPI } from "./api/contacts";
import { CurrenciesAPI } from "./api/currencies";
import { DonationsAPI } from "./api/donations";
import { EventsAPI } from "./api/events";
import { FilesAPI } from "./api/files";
import { ImagesAPI } from "./api/images";
import { MessagesAPI } from "./api/messages";
import { OrdersAPI } from "./api/orders";
import { ProductsAPI } from "./api/products";
import { ReferenceValuesAPI } from "./api/reference-values";
import { ReviewsAPI } from "./api/reviews";
import { ShippingsAPI } from "./api/shippings";
import { SpecificationsAPI } from "./api/specifications";
import { SpecificationGroupsAPI } from "./api/specification-groups";
import { TagsAPI } from "./api/tags";
import { UsersAPI } from "./api/users";
import { VendorsAPI } from "./api/vendors";

export class MarkkoSDK {
  private authService: AuthService;
  public auth: AuthAPI;
  public addresses: AddressesAPI;
  public attributes: AttributesAPI;
  public blogs: BlogsAPI;
  public carts: CartsAPI;
  public categories: CategoriesAPI;
  public charities: CharitiesAPI;
  public checkouts: CheckoutsAPI;
  public commissions: CommissionsAPI;
  public contacts: ContactsAPI;
  public currencies: CurrenciesAPI;
  public donations: DonationsAPI;
  public events: EventsAPI;
  public files: FilesAPI;
  public images: ImagesAPI;
  public messages: MessagesAPI;
  public orders: OrdersAPI;
  public products: ProductsAPI;
  public referenceValues: ReferenceValuesAPI;
  public reviews: ReviewsAPI;
  public shippings: ShippingsAPI;
  public specifications: SpecificationsAPI;
  public specificationGroups: SpecificationGroupsAPI;
  public tags: TagsAPI;
  public users: UsersAPI;
  public vendors: VendorsAPI;

  constructor(config: MarkkoConfig) {
    this.authService = new AuthService(config);
    this.auth = new AuthAPI(config, this.authService);
    this.addresses = new AddressesAPI(config, this.authService);
    this.attributes = new AttributesAPI(config, this.authService);
    this.blogs = new BlogsAPI(config, this.authService);
    this.carts = new CartsAPI(config, this.authService);
    this.categories = new CategoriesAPI(config, this.authService);
    this.charities = new CharitiesAPI(config, this.authService);
    this.checkouts = new CheckoutsAPI(config, this.authService);
    this.commissions = new CommissionsAPI(config, this.authService);
    this.contacts = new ContactsAPI(config, this.authService);
    this.currencies = new CurrenciesAPI(config, this.authService);
    this.donations = new DonationsAPI(config, this.authService);
    this.events = new EventsAPI(config, this.authService);
    this.files = new FilesAPI(config, this.authService);
    this.images = new ImagesAPI(config, this.authService);
    this.messages = new MessagesAPI(config, this.authService);
    this.orders = new OrdersAPI(config, this.authService);
    this.products = new ProductsAPI(config, this.authService);
    this.referenceValues = new ReferenceValuesAPI(config, this.authService);
    this.reviews = new ReviewsAPI(config, this.authService);
    this.shippings = new ShippingsAPI(config, this.authService);
    this.specifications = new SpecificationsAPI(config, this.authService);
    this.specificationGroups = new SpecificationGroupsAPI(
      config,
      this.authService
    );
    this.tags = new TagsAPI(config, this.authService);
    this.users = new UsersAPI(config, this.authService);
    this.vendors = new VendorsAPI(config, this.authService);
  }

  async getAccessToken(): Promise<string> {
    return this.authService.getAccessToken();
  }
}

export default MarkkoSDK;
