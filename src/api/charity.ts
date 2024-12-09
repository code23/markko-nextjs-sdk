import { AuthService } from "../services/auth";
import { APIError } from "../types";
import { BaseAPI } from "./base";

export class CharityAPI extends BaseAPI {
    constructor(config: any, authService: AuthService) {
        super(config, authService);
    }

    /**
     * Retrieve all charities
     * @throws {APIError} If the API request fails or returns an error
     * @return list of charities
     */
    async charitiesList(params = [], oauth = null) {
        try {
            const url = `${this.config.apiBasePath}/api/v1/charities`;
            const headers = oauth ? { Authorization: `Bearer ${oauth}` } : {};
            const response = await this.axiosInstance.get(url, { params, headers });

            // Check for API-defined errors in the response data
            if (response.data.error) {
                throw new APIError(response.data.message, 422);
            }

            return response.data;
        } catch (error: any) {
            if (error instanceof APIError) {
                throw error;
            }
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || 'An unexpected error occurred while fetching charities.';
            throw new APIError(message, status);
        }
    }

    /**
     * Save a vendor
     */
    async saveVendor(data: any) {
        try {
            const url = `${this.config.apiBasePath}/api/v1/charities/register`;
            const response = await this.axiosInstance.post(url, data);
            console.log('response', response)
            return response.data;
        } catch (error: any) {

        }

    }

    /**
     * Check charity name is unique
     *  @param name The name to check for uniqueness within the tenant
     *  @returns boolean
     */
    async nameIsUnique(name: any) {
        try {
            const url = `${this.config.apiBasePath}/api/v1/charities/is-name-unique`;
            const response = await this.axiosInstance.get(url, { params: { name } })
            return response.data;
        } catch (error: any) {
            if (error instanceof APIError) {
                throw error;
            }
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || 'A problem was encountered during the request to check charity name is unique.';
            throw new APIError(message, status);
        }
    }

    /**
     * Retrieve a charity by id
     * @param id charity id to retrive
     * @param with Charity relationship (comma separated?) to include
     */
    async getCharityListById(id: number, params = []) {
        try {
            const url = `${this.config.apiBasePath}/api/v1/charities/${id}`;
            const response = await this.axiosInstance.get(url, { params });
            return response.data;
        } catch (error: any) {
            if (error instanceof APIError) {
                throw error;
            }
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || 'A problem was encountered during the charity retrieval';
            throw new APIError(message, status);
        }
    }

    /**
     * Retrieve a charity by slug
     * @param slug Chairty slug to retrieve
     * @param with Charity relationships (comma separated) to include
     */
    async getCharityBySlug(slug: string, params = []) {
        try {
            const url = `${this.config.apiBasePath}/api/v1/charities/slug/${slug}`;
            const response = await this.axiosInstance.get(url, { params })
            return response.data;
        } catch (error: any) {
            if (error instanceof APIError) {
                throw error;
            }
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || 'A problem was encountered during the charity retrieval';
            throw new APIError(message, status);
        }
    }
}
