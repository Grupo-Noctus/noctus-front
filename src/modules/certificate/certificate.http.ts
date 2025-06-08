import type { AxiosInstance } from "axios";

export class CertificateHttp {
    constructor(private readonly httpClient: AxiosInstance) {
        this.httpClient = httpClient;
    }

    async uploadCertificateHttp(enrollmentId: number) {
        const { data } = await this.httpClient.get(`/certificate/${enrollmentId}`, {
            responseType: "blob",
            headers: {
                Accept: "application/pdf",
            },
        });

        return data;
    }
}
