import type { AxiosInstance } from "axios";
import type { TRegisterFormData } from "./auth.types";

export class AuthHttp {
    constructor(private readonly httpClient: AxiosInstance) {
        this.httpClient = httpClient;
    }

    async loginHttp(usernameOrEmail: string, password: string) {
        const response = await this.httpClient.post(
            "/auth/login",
            { usernameOrEmail, password },
            { headers: { isPublic: true } },
        );
        const { data } = response;

        return data;
    }

    async registerHttp(formData: TRegisterFormData ) {
        const { data } = await this.httpClient.post("/auth/register",  
            formData,
            { headers: { isPublic: true } },
         );
        return data;
    }
}
