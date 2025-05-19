import type { AxiosInstance } from "axios";

export class CourseHttp {
    constructor(private readonly httpClient: AxiosInstance) {
        this.httpClient = httpClient;
    }

    async getCourseByEnrollmentHttp() {
        const { data } = await this.httpClient.get("/enrollment/course");

        return data;
    }
}
