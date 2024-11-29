import { BaseAPI } from './base';
import { AuthService } from '../services/auth';

export class BlogsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Get a list of blog posts
   * @param params - The query parameters to filter the blog posts
   * @returns A list of blog posts
   */
  async listPosts(params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/blog/posts`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

  /**
   * Get a list of blog categories
   * @param params - The query parameters to filter the blog categories
   * @returns A list of blog categories
   */
  async listCategories(params = {}) {
    const defaultParams = {
      is_active: 1
    };
    const url = `${this.config.apiBasePath}/api/v1/blog/categories`;
    const response = await this.axiosInstance.get(url, { params: { ...defaultParams, ...params } });
    return response.data;
  }

  /**
   * Get a list of posts by blog category
   * @param categoryId - The ID of the blog category
   * @param params - The query parameters to filter the blog posts
   * @returns A list of blog posts
   */
  async listPostsByCategory(categoryId: number, params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/blog/categories/${categoryId}`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

  /**
   * Get a single blog post
   * @param id - The ID of the blog post
   * @param params - The query parameters to filter the blog post
   * @returns A single blog post
   */
  async getPost(id: number, params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/blog/posts/${id}`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

  /**
   * Get a single blog post by slug
   * @param slug - The slug of the blog post
   * @param params - The query parameters to filter the blog post
   * @returns A single blog post
   */
  async getPostBySlug(slug: string, params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/blog/posts/slug/${slug}`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

  /**
   * Get a blog category by slug with its posts
   * @param slug - The slug of the blog category
   * @param params - The query parameters to filter the blog category
   * @returns A single blog category with its posts
   */
  async getCategoryBySlug(slug: string, params = {}) {
    const defaultParams = {
      is_active: 1
    };
    const url = `${this.config.apiBasePath}/api/v1/blog/categories/slug/${slug}`;
    const response = await this.axiosInstance.get(url, { params: { ...defaultParams, ...params } });
    return response.data;
  }
}
