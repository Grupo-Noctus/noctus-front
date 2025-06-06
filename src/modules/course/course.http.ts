import type { AxiosInstance } from "axios";
import type { exam } from "./course.types";

export class CourseHttp {
    constructor(private readonly httpClient: AxiosInstance) {
        this.httpClient = httpClient;
    }

    async getCourseByEnrollmentHttp() {
        const { data } = await this.httpClient.get("/enrollment-course/find-many");

        return data;
    }

    async getEnrollmentCoursesHttp() {
        const { data } = await this.httpClient.get("/enrollment-course/find-many");

        return data;
    }

    async getExamByModuleIdHttp(moduleId: number): Promise<exam[]> {
        const { data } = await this.httpClient.get(`/exam/find-many/${moduleId}`);

        return data as exam[];
    }
}
