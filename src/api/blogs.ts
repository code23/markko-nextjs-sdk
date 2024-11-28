import { BaseAPI } from './base';
import { AuthService } from '../services/auth';

export class BlogPostsAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  // Get a list of blog posts
  async listPosts(params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/blog/posts`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

  // Get a list of blog categories
  async listCategories(params = {}) {
    const defaultParams = {
      is_active: true
    };
    const url = `${this.config.apiBasePath}/api/v1/blog/categories`;
    const response = await this.axiosInstance.get(url, { params: { ...defaultParams, ...params } });
    return response.data;
  }

  // Get a list of posts by blog category
  async listPostsByCategory(categoryId: number, params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/blog/categories/${categoryId}`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

  // Get a single blog post
  async getPost(id: number, params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/blog/posts/${id}`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

  // Get a single blog post by slug
  async getPostBySlug(slug: string, params = {}) {
    const url = `${this.config.apiBasePath}/api/v1/blog/posts/slug/${slug}`;
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

  // Get a blog category by slug with its posts
  async getCategoryBySlug(slug: string, params = {}) {
    const defaultParams = {
      is_active: true
    };
    const url = `${this.config.apiBasePath}/api/v1/blog/categories/slug/${slug}`;
    const response = await this.axiosInstance.get(url, { params: { ...defaultParams, ...params } });
    return response.data;
  }
}
