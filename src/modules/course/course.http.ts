import type { AxiosInstance } from "axios";

export class CourseHttp {
    constructor(private readonly httpClient: AxiosInstance) {
        this.httpClient = httpClient;
    }

    async getCourseByEnrollmentHttp() {
        const { data } = await this.httpClient.get("/enrollment/course", {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiYm90aW5oYXMiLCJyb2xlIjoiQURNSU4iLCJhY3RpdmUiOnRydWUsImlhdCI6MTc0NzM1NDYzOSwiZXhwIjoxNzQ3OTU5NDM5fQ.HRZAuppdWlRj2IWrC6ENJ9fk6AElxYwltV2M285unsU`,
            },
        });

        return data;
    }
}
