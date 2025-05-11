import type { AxiosInstance } from "axios";

export class AuthHttp {
    constructor(private readonly httpClient: AxiosInstance) {
        this.httpClient = httpClient;
    }

    async loginHttp(usernameOrEmail: string, password: string) {
        const { data } = await this.httpClient.post("/auth/login", { usernameOrEmail, password });

        return data;
    }

    async registerHttp(formData: any) {
        const { data } = await this.httpClient.post("/auth/register",  formData );
        return data;
    }
}
