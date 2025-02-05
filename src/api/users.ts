import { AuthService, TokenData } from "../services/auth";
import { BaseAPI } from "./base";

export class UsersAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Retrieve the currently authenticated user
   * @param oauth Optional OAuth token data
   * @returns The user data
   */
  async get(oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/user`;
    const config: any = {
      params: {
        with: "profile",
      },
    };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Create a new user
   * @param data The request object containing user data
   * @param oauth - Optional OAuth token data for authentication.
   * @returns A Promise that resolves to a boolean indicating the success or failure of the operation.
   * @throws Error if the API call fails or if validation of the input data fails.
   */
  async create(
    data: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      password_confirmation: string;
      terms: boolean;
      currency_id: string;
      phone?: string;
    },
    oauth: TokenData | null = null
  ) {
    const rules: Record<keyof typeof data, (value: any) => true | string> = {
      first_name: (value) => !!value || "First name is required",
      last_name: (value) => !!value || "Last name is required",
      email: (value) =>
        /\S+@\S+\.\S+/.test(value) || "A valid email is required",
      password: (value) =>
        /(?=.*[a-z])(?=.*[A-Z])/.test(value) ||
        "Password must include at least one upper & lowercase letter",
      password_confirmation: () => true,
      terms: (value) => value === true || "Terms must be accepted",
      currency_id: (value) => !!value || "Currency is required",
      phone: () => true,
    };

    const errors = (Object.keys(rules) as (keyof typeof data)[])
      .map((field) =>
        rules[field](data[field]) === true
          ? null
          : { [field]: rules[field](data[field]) }
      )
      .filter(Boolean);

    if (errors.length > 0) {
      return new Error(JSON.stringify(errors));
    }

    const url = `${this.config.apiBasePath}/api/v1/customers/register`;
    const config: any = {
      params: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password_confirmation,
        terms: data.terms,
        type: "customer",
        currency_id: data.currency_id,
      },
    };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.post(url, config);
    return response.data;
  }

  /**
   * Deletes the currently authenticated user.
   * @param oauth - The OAuth token data (optional) for authentication.
   * @returns Promise<any> containing the response data from the deletion operation.
   * @throws Error if the API call fails.
   */
  async delete(oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/customers`;
    const config: any = {};

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.delete(url, config);
    return response.data;
  }

  /**
   * Check if an email exists in the team
   * @param email - The email address to check
   * @param oauth - The OAuth token data (optional)
   * @returns The response data indicating if the email exists
   */
  async emailExistsInTeam(email: string, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/tenants/has-user-with-email`;
    const config: any = { params: { email } };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Updates the user's profile with the provided data.
   * @param data - The user profile data to update, including first name, last name, phone, password, and currency ID.
   * @param oauth - The OAuth token data (optional) for authentication.
   * @returns Promise<any> containing the updated user data.
   * @throws Error if the API call fails or if validation fails.
   */
  async updateProfile(
    data: {
      first_name: string;
      last_name: string;
      phone?: string;
      password?: string;
      password_confirmation?: string;
      currency_id: string;
    },
    oauth: TokenData | null = null
  ) {
    const url = `${this.config.apiBasePath}/api/v1/customers`;
    const config: any = {
      params: {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password_confirmation,
        currency_id: data.currency_id,
      },
    };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.patch(url, config);
    return response.data.data;
  }

  /**
   * Sends an email verification link to the user.
   * This method triggers the sending of a verification email to the user's registered email address.
   * @param oauth - The OAuth token data (optional) for authentication.
   * @returns Promise<string> indicating the result of the operation, typically a success message.
   * @throws Error if the API call fails, providing details about the failure.
   */
  async sendEmailVerificationLink(oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/auth/email/verification-notification/`;
    const config: any = {};

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.post(url, config);
    return response.data;
  }

  /**
   * Retrieves the user's wishlist.
   * This method fetches the list of products that the authenticated user has added to their wishlist.
   * @param oauth - The OAuth token data (optional) for authentication.
   * @returns The response data containing the user's wishlist items.
   */
  async wishlist(oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/wishlist`;
    const config: any = {};

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Adds a product to the authenticated user's wishlist.
   * This method allows the user to add a specified product to their wishlist by its ID.
   * @param id - The ID of the product to add to the wishlist.
   * @param oauth - The OAuth token data (optional) for authentication.
   * @returns Promise<Collection> containing the updated wishlist items after the addition.
   */
  async wishlistAdd(id: number, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/wishlist/add/${id}`;
    const config: any = {};

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.patch(url, config);
    return response.data;
  }

  /**
   * Removes a product from the authenticated user's wishlist.
   * This method allows the user to remove a specified product from their wishlist by its ID.
   * @param id - The ID of the product to remove from the wishlist.
   * @param oauth - The OAuth token data (optional) for authentication.
   * @returns The response data indicating the result of the operation, typically a success message.
   */
  async wishlistRemove(id: number, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/wishlist/remove/${id}`;
    const config: any = {};

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.patch(url, config);
    return response.data;
  }
}
