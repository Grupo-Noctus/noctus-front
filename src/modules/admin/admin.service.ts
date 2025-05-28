import { adminHttp } from "@/plugins/api/http-instances";
import { pushMessageNotification } from "@/utils/notivue-base";
import type { TCourses } from "./admin.types";

export const AdminService = () => {
    const getCoursesService = async (): Promise<TCourses[]> => {
        try {
            const data = await adminHttp.getCoursesHttp();

            return data;
        } catch (error) {
            pushMessageNotification({
                type: "error",
                message: "erro ao buscar o curso",
                duration: 3000,
            });

            console.error(error);
            return [];
        }
    };

    return { getCoursesService };
};
