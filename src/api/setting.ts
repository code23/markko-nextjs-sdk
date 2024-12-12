import { AuthService } from "../services/auth";
import { BaseAPI } from "./base";

export class SettingServiceAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  async getSettingService(relationships = null) {
    const url = `${this.config.apiBasePath}/api/v1/settings/commission-groups`;
    const response = await this.axiosInstance.get(url, {
      params: { with: relationships },
    });
    return response.data;
  }
}
