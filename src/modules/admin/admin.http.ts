import type { AxiosInstance } from "axios";
import type {
    TCourses,
    TCreateContentData,
    TCreateCourseData,
    TCreateMaterial,
    TCreateModuleData,
    TMaterial,
} from "./admin.types";

export class AdminHttp {
    constructor(private readonly httpAdmin: AxiosInstance) {
        this.httpAdmin = httpAdmin;
    }

    async getCoursesHttp(): Promise<TCourses[]> {
        const { data } = await this.httpAdmin.get("/course/admin/find-many");

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

    async createModuleHttp(form: TCreateModuleData, courseId: number): Promise<boolean> {
        const { data } = await this.httpAdmin.post(`/module/create/${courseId}`, form);

        return data;
    }

    async updateModuleHttp(form: TCreateModuleData, moduleId: number): Promise<boolean> {
        const { data } = await this.httpAdmin.put(`/module/update/${moduleId}`, form);

        return data;
    }

    async deleteModuleHttp(moduleId: number) {
        const { data } = await this.httpAdmin.delete(`/module/delete/${moduleId}`);

        return data;
    }

    async createContentHttp(form: TCreateContentData, moduleId: number): Promise<boolean> {
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("description", form.description);

        if (form.video) {
            formData.append("video", form.video);
        }

        const { data } = await this.httpAdmin.post(`/streaming/upload/${moduleId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return data;
    }

    async updateContentHttp(form: TCreateContentData, contentId: number): Promise<boolean> {
        const formData = new FormData();

        if (form.video) {
            formData.append("video", form.video);
        }

        const { data } = await this.httpAdmin.post(`/streaming/update/${contentId}`, body, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return data;
    }

    async deleteContentHttp(videoId: number): Promise<boolean> {
        const { data } = await this.httpAdmin.delete(`/streaming/delete/${videoId}`);

        return data;
    }

    async getMaterialsHttp(courseId: number): Promise<TMaterial[]> {
        const { data } = await this.httpAdmin.get(`/material/find-many/${courseId}`);
        return data as TMaterial[];
    }

    async createMaterialHttp(form: TCreateMaterial): Promise<boolean> {
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("link", form.link || "https://link.com/material");
        formData.append("type", form.type );
        formData.append("idCourse", String(form.courseId));

        if (form.file) {
            formData.append("file", form.file);
        }

        const { data } = await this.httpAdmin.post("/material/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return data;
    }

    async deleteMaterialHttp(id: number) {
        const { data } = await this.httpAdmin.delete(`/material/delete/${id}`);

        return data;
    }
}
