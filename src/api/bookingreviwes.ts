import { ApiError } from "next/dist/server/api-utils";
import { AuthService } from "../services/auth";
import { APIError } from "../types";
import { BaseAPI } from "./base";

interface ListReviewsParams {
  ids?: Record<string, any>;
  paginate?: number;
  page?: number;
  with?: string;
  sort?: string;
}

interface ReviewData {
  id: string;
  booking_id: string;
  review: string;
  rating: number;
  created_at: string;
}

export class BookingReviewAPI extends BaseAPI {
  constructor(config: any, authService: AuthService) {
    super(config, authService);
  }

  /**
   * Create a new review
   * @param data - The data to create the review with
   * @returns The created review
   */
  async create(data: { booking_id: String; review: String; rating: number }) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/booking-reviews`;
      const response = await this.axiosInstance.post(url, data);

      if (response.data?.error) {
        throw new ApiError(response.data.message, response.data.code);
      }
      return response.data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      } else {
        throw new APIError(
          "A problem was encountered during the request to create a new address.",
          422
        );
      }
    }
  }

  /**
   * Update a Booking Review
   * @param data - An object containing the booking ID, review text, and rating
   * @param data.booking_id - The ID of the Booking to update the review for
   * @param data.review - The review text to be updated
   * @param data.rating - The rating to be updated (as a number)
   * @returns The updated Booking review
   */
  async updatebookingreview(data: {
    booking_id: String;
    review: String;
    rating: number;
  }) {
    try {
      const url = `${this.config.apiBasePath}/api/v1/booking-reviews`;
      const response = await this.axiosInstance.patch(url, data);
      if (response.data?.error) {
        throw new ApiError(response.data.message, response.data.code);
      }
      return response.data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      } else {
        throw new APIError(
          "A problem was encountered during the request to create a new address.",
          422
        );
      }
    }
  }

  /**
   * Delete an Booking review
   * @param id - The ID of the Booking review to delete
   * @returns The deleted Booking review
   */
  async deletebookingreview(id: string) {
    const url = `${this.config.apiBasePath}/api/v1/booking-reviews/${id}`;
    const response = await this.axiosInstance.delete(url);
    return response.data;
  }

  /**
   * Return a list of reviews.
   * By default, it returns all reviews.
   * @param ids - Model and id pairs to filter by. E.g. { booking_id: 1 }
   * @param paginate - Pagination items per page. Defaults to all (0 for no pagination).
   * @param page - Pagination page to retrieve. Defaults to 1.
   * @param with - Relationships to include.
   * @param sort - Sort results by a specific field.
   * @returns A promise that resolves to the collection of reviews or throws an error if the request fails.
   */
  async listReviews({
    ids = {},
    paginate = 10,
    page = 1,
    with: relationships = "",
    sort = "",
  }: ListReviewsParams): Promise<ReviewData[]> {
    try {
      const params = {
        with: relationships,
        ...ids,
        paginate: paginate || undefined,
        page: page > 1 ? page : undefined,
        sort: sort || undefined,
      };
      const url = `${this.config.apiBasePath}/api/v1/booking-reviews`;
      const response = await this.axiosInstance.get(url, { params });
      if (response.data?.error) {
        throw new APIError(response.data.message, response.data.code);
      }
      return response.data?.data || [];
    } catch (error) {
      throw error;
    }
  }
}
