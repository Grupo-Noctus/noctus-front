import type { AxiosInstance } from "axios";
import type { TCourses, TCreateCourseData } from "./admin.types";

export class AdminHttp {
    constructor(private readonly httpAdmin: AxiosInstance) {
        this.httpAdmin = httpAdmin;
    }

    async getCoursesHttp(): Promise<TCourses[]> {
        const { data } = await this.httpAdmin.get("/course/admin/find-many?");

        return data.courses as TCourses[];
    }

    async createCourseHttp(form: TCreateCourseData): Promise<boolean> {
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("duration", form.duration.toString());

        if (form.imageCourse) {
            formData.append("imageCourse", form.imageCourse);
        }

        const { data } = await this.httpAdmin.post("/course/admin/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return data;
    }

    async updateCourseHttp(form: TCreateCourseData & { id?: number }): Promise<boolean> {
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("duration", form.duration.toString());

        if (form.imageCourse) {
            formData.append("imageCourse", form.imageCourse);
        }

        const { data } = await this.httpAdmin.put(`/course/admin/update/${form.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return data;
    }

    async deleteCourseHttp(id: number) {
        const { data } = await this.httpAdmin.put(`/course/admin/visibility/${id}`);

        return data;
    }
}
