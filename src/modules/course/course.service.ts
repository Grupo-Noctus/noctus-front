import { courseHttp } from "@/plugins/api/http-instances";
import { pushMessageNotification } from "@/utils/notivue-base";
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
    return { getCourseByEnrollmentService };
};
