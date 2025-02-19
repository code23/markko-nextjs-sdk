import { BaseAPI } from "./base";
import { AuthService, TokenData } from "../services/auth";

export class BlogsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of blog posts
   * @param params - The query parameters to filter the blog posts
   * @param oauth - The OAuth token data
   * @returns A list of blog posts
   */
  async listPosts(params = {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/blog/posts`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Get a list of blog categories
   * @param params - The query parameters to filter the blog categories
   * @param oauth - The OAuth token data
   * @returns A list of blog categories
   */
  async listCategories(params = {}, oauth: TokenData | null = null) {
    const defaultParams = {
      is_active: 1,
    };
    const url = `${this.config.apiBasePath}/api/v1/blog/categories`;
    const config: any = { params: { ...defaultParams, ...params } };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Get a list of posts by blog category
   * @param categoryId - The ID of the blog category
   * @param params - The query parameters to filter the blog posts
   * @param oauth - The OAuth token data
   * @returns A list of blog posts
   */
  async listPostsByCategory(
    categoryId: number,
    params = {},
    oauth: TokenData | null = null
  ) {
    const url = `${this.config.apiBasePath}/api/v1/blog/categories/${categoryId}`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Get a single blog post
   * @param id - The ID of the blog post
   * @param params - The query parameters to filter the blog post
   * @param oauth - The OAuth token data
   * @returns A single blog post
   */
  async getPost(id: number, params = {}, oauth: TokenData | null = null) {
    const url = `${this.config.apiBasePath}/api/v1/blog/posts/${id}`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Get a single blog post by slug
   * @param slug - The slug of the blog post
   * @param params - The query parameters to filter the blog post
   * @param oauth - The OAuth token data
   * @returns A single blog post
   */
  async getPostBySlug(
    slug: string,
    params = {},
    oauth: TokenData | null = null
  ) {
    const url = `${this.config.apiBasePath}/api/v1/blog/posts/slug/${slug}`;
    const config: any = { params };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Get a blog category by slug with its posts
   * @param slug - The slug of the blog category
   * @param params - The query parameters to filter the blog category
   * @param oauth - The OAuth token data
   * @returns A single blog category with its posts
   */
  async getCategoryBySlug(
    slug: string,
    params = {},
    oauth: TokenData | null = null
  ) {
    const defaultParams = {
      is_active: 1,
    };
    const url = `${this.config.apiBasePath}/api/v1/blog/categories/slug/${slug}`;
    const config: any = { params: { ...defaultParams, ...params } };

    if (oauth) {
      config.headers = {
        "X-OAuth-Token": JSON.stringify(oauth),
      };
    }

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }
}
