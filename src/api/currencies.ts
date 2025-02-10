import { AuthService, TokenData } from "../services/auth";
import { BaseAPI } from "./base";

export class CurrencyAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Retrieve available currencies from API
   * @param params - The query parameters to filter the currencies
   * @param oauth - The OAuth token data
   * @returns A list of available currencies
   */
  async list(params = { is_enabled: true }, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/settings/currencies`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }
}
