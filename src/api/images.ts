import { BaseAPI } from "./base";
import { AuthService, TokenData } from "../services/auth";
import { APIError } from "../types";

export class ImagesAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of images
   * @param params - The query parameters to filter the images
   * @param oauth - The OAuth token data
   * @returns A list of images
   */
  async list(params = {}, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/images`;
      const config: any = { params };

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
        "A problem was encountered during the request to fetch the images.",
        422
      );
    }
  }

  /**
   * Get a image by id
   * @param id - The ID of the image
   * @param oauth - The OAuth token data
   * @returns A single image
   */
  async get(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/images/${id}`;
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
        "A problem was encountered during the request to fetch image.",
        422
      );
    }
  }

  /**
   * Delete an image by id
   * @param id - The ID of the image
   * @param oauth - The OAuth token data
   * @returns A delete operation response
   */
  async delete(id: number, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/images/${id}`;
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
        "A problem was encountered during the request to delete the image.",
        422
      );
    }
  }

  /**
   * Delete images by id
   * @param imageIds - The IDs of the image in array format
   * @param oauth - The OAuth token data
   * @returns A delete operation response
   */
  async deleteImages(imageIds: number[], oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/images`;
      const config: any = {
        data: {
          image_ids: imageIds,
        },
      };

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
        "A problem was encountered during the request to delete the images.",
        422
      );
    }
  }

  /**
   * Register an image
   * @param payload - The image payload containing the S3 image response and the model data
   * @param oauth - The OAuth token data
   * @returns A register operation response
   */
  async register(payload: Record<string, any>, oauth: TokenData | null = null) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/images/register`;
      const config: any = {};
      const image = {
        uuid: payload.uuid,
        key: payload.key,
        bucket: payload.bucket,
        image: payload.image,
        modelId: payload.modelId,
        model: payload.model,
        visibility: payload.visibility,
      };

      if (oauth) {
        config.headers = {
          "X-OAuth-Token": JSON.stringify(oauth),
        };
      }

      const response = await this.axiosInstance.post(url, image, config);

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
        "A problem was encountered during the request to register the image.",
        422
      );
    }
  }
}
