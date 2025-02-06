import { AuthService, TokenData } from "../services/auth";
import { BaseAPI } from "./base";

export class MessagesAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of channels
   * @param params - The query parameters to filter the channels
   * @param oauth - The OAuth token data
   * @returns A list of channels
   */
  async getAllChannels(params = {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/messaging`;
    const config: any = {
      params: {
        status: "open",
        type: null,
        ...params,
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
   * Get a channel by ID
   * @param channelId - The ID of the channel to retrieve
   * @param params - The query parameters for the request
   * @param oauth - The OAuth token data
   * @returns The channel data
   */
  async getChannel(
    channelId: string,
    params = {},
    oauth: TokenData | null = null
  ) {
    const url = `${this.config.apiBasePath}/api/v1/messaging/view/${channelId}`;
    const config: any = {
      params: {
        paginate: 30,
        ...params,
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
   * Load more messages for a channel
   * @param channelId - The ID of the channel to load messages from
   * @param params - The query parameters for pagination
   * @param oauth - The OAuth token data
   * @returns The messages data
   */
  async loadMoreMessages(
    channelId: string,
    params = {},
    oauth: TokenData | null = null
  ) {
    const url = `${this.config.apiBasePath}/api/v1/messaging/${channelId}/messages`;
    const config: any = {
      params: {
        page: 1,
        paginate: 30,
        ...params,
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
   * Send a message
   * @param params - The parameters for the message (should include channel_name)
   * @param oauth - The OAuth token data
   * @returns The message data
   */
  async sendMessage(
    params: {
      order_id?: string | null;
      event_id?: string | null;
      is_update: boolean;
      channel_name?: string | null;
      recipient_id: string;
      message: {
        body: string;
        files?: any[] | null;
      };
      meta?: any[];
    } = {
      is_update: false,
      message: {
        body: "",
        files: null,
      },
      recipient_id: "",
    },
    oauth: TokenData | null = null
  ) {
    if (!params.is_update && !params.channel_name) {
      throw new Error("channel_name is required when is_update is false");
    }

    if (!params.recipient_id) {
      throw new Error("recipient_id is required");
    }
    if (!params.message || !params.message.body) {
      throw new Error("message.body is required");
    }
    const url = `${this.config.apiBasePath}/api/v1/messaging`;
    const config: any = {
      params: {
        order_id: params.order_id,
        event_id: params.event_id,
        is_update: params.is_update,
        channel_name: params.channel_name,
        recipient_id: params.recipient_id,
        message: params.message,
        meta: params.meta,
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
   * Close a messaging channel
   * @param channelId - The ID of the channel to close
   * @param oauth - The OAuth token data
   * @returns The response data from closing the channel
   */
  async closeChannel(channelId: string, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/messaging/close/${channelId}`;
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
