import type { AxiosInstance } from "axios";
import type { TCourses } from "./admin.types";

export class AdminHttp {
    constructor(private readonly httpAdmin: AxiosInstance) {
        this.httpAdmin = httpAdmin;
    }

    async getCoursesHttp(): Promise<TCourses[]> {
        const { data } = await this.httpAdmin.get("/course/admin/find-many", {
            params: { page: 1, limit: 10 },
        });

        return data as TCourses[];
    }
}
