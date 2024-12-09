import { AuthService } from "../services/auth";
import { BaseAPI } from "./base";

export class DonationAPI extends BaseAPI {
    constructor(config: any, authService: AuthService) {
        super(config, authService);
    }

    /**
     * Get a donation by numbers
     * @param params - The query parameters to filter the Donation by numbers
     * @returns A list of Donation by numbers
     */

    async getDonation(Number: string, queryparams = []) {
        const url = `${this.config.apiBasePath}/api/v1/donations/number/${Number}`;
        const response = await this.axiosInstance.get(url, { params: queryparams });
        return response.data;
    }

    /**
     * @param params - The query parameters to filter the Donation by numbers
     * @returns A list of Donations
     */

    async getAllDonations(params = []) {
        const url = `${this.config.apiBasePath}/api/v1/donations`;
        const response = await this.axiosInstance.get(url, { params });
        return response.data;
    }

    /**
     * Process a donation for a specific charity
     * @param charityId - The ID of the charity to donate to
     * @param data - The donation details to be sent in the request body
     * @returns A Promise that resolves to the donation response data
     */
    async processDonation(charityId: string, data: Record<string, any>) {
        const url = `${this.config.apiBasePath}/api/v1/charities/${charityId}/donate`;
        const response = await this.axiosInstance.post(url, data);
        const responseData = response.data;
        return responseData.data || {};
    }
}