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

    const getStreamingVideoUrlService = async (idVideo: number) => {
        try {
            const data = await courseHttp.getStreamingVideoUrlHttp(idVideo);
            return data;
        } catch (error) {
            pushMessageNotification({
                type: "error",
                title: "Erro!",
                message: "Não foi possível obter o link do vídeo :(!",
            });
        }
    };
    return {
        getEnrollmentCoursesService,
        getCourseByEnrollmentService,
        getStreamingVideoUrlService,
    };
};
