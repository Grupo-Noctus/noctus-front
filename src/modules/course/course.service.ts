import { courseHttp } from "@/plugins/api/http-instances";
import { pushMessageNotification } from "@/utils/notivue-base";
import type { exam } from "./course.types";
pushMessageNotification;

export const CourseService = () => {
    const getCourseByEnrollmentService = async () => {
        try {
            const data = await courseHttp.getCourseByEnrollmentHttp();
            return data;
        } catch (error) {
            pushMessageNotification({
                type: "error",
                title: "Erro!",
                message: "Nenhum curso em sua matricula encontrado :(!",
                duration: 3000,
            });
        }
    };

    const getEnrollmentCoursesService = async () => {
        try {
            const data = await courseHttp.getEnrollmentCoursesHttp();
            return data;
        } catch (error) {
            pushMessageNotification({
                type: "error",
                title: "Erro!",
                message: "Nenhum curso em sua matricula encontrado :(!",
            });
        }
    };

    const getExamByModuleIdService = async (moduleId: number): Promise<exam[]> => {
        try {
            const data = await courseHttp.getExamByModuleIdHttp(moduleId);
            return data;
        } catch (error) {
            pushMessageNotification({
                type: "error",
                title: "Erro!",
                message: "Nenhum exame encontrado :(!",
            });
            return [];
        }
    };

    return {
        getEnrollmentCoursesService,
        getCourseByEnrollmentService,
        getExamByModuleIdService,
    };
};
