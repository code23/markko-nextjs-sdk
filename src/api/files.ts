import { BaseAPI } from "./base";
import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";

export class FilesAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of files
   * @param oauth - The OAuth token data
   * @returns A list of files
   */
  async list(oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/files`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.get(url, config);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to fetch the files.",
        422
      );
    }
  }

  /**
   * Get a file by id
   * @param id - The ID of the file
   * @param oauth - The OAuth token data
   * @returns A single file
   */
  async get(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/files/${id}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.get(url, config);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to fetch the file.",
        422
      );
    }
  }

  /**
   * Delete a file by id
   * @param id - The ID of the file
   * @param oauth - The OAuth token data
   * @returns A delete operation response
   */
  async delete(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/files/${id}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.delete(url, config);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to delete the file.",
        422
      );
    }
  }

  /**
   * Download a file by id
   * @param id - The ID of the file
   * @param oauth - The OAuth token data
   * @returns A url to download the file
   */
  async download(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/files/${id}/download`;
      const config: any = {
        responseType: "json",
      };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.get(url, config);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data.data.url;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to download the file.",
        422
      );
    }
  }

  /**
   * Update a file
   * @param payload - The file payload containing the file id or model id and the model data
   * @param oauth - The OAuth token data
   * @returns An update operation response
   */
  async update(payload: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/files/${payload.id ?? payload.modelId}`;
      const config: any = {};

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.patch(url, payload, config);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new APIError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      }

      throw new APIError(
        "A problem was encountered during the request to update the file.",
        422
      );
    }
  }

  /**
   * Register a file
   * @param payload - The file payload containing the S3 file response and the model data
   * @param oauth - The OAuth token data
   * @returns A register operation response
   */
  async register(payload: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/files/register`;
      const config: any = {};
      const file = {
        uuid: payload.uuid,
        key: payload.key,
        bucket: payload.bucket,
        file: payload.file,
        modelId: payload.modelId,
        model: payload.model,
        visibility: payload.visibility,
        ownerId: payload.ownerId,
      };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.post(url, file, config);

      if (response.data?.error) {
        throw new APIError(
          response.data.message,
          response.data.code,
          response.data.errors
        );
      }

      return response.data;
    } catch (error: any) {
      throw new APIError(
        "A problem was encountered during the request to register the file.",
        422
      );
    }
  }
}
