import type { AxiosInstance } from "axios";

export class AuthHttp {
    constructor(private readonly httpClient: AxiosInstance) {
        this.httpClient = httpClient;
    }

    async loginHttp() {
        const { data } = await this.httpClient.get("");
        return data;
    }
}
