import { adminHttp } from "@/plugins/api/http-instances";
import { pushMessageNotification } from "@/utils/notivue-base";
import type { TCourses, TCreateCourseData } from "./admin.types";

export const AdminService = () => {
    const getCoursesService = async (): Promise<TCourses[]> => {
        try {
            const data = await adminHttp.getCoursesHttp();

            return data;
        } catch (error) {
            pushMessageNotification({
                type: "error",
                message: "Erro ao buscar o curso",
                duration: 3000,
            });

            console.error(error);
            return [];
        }
    };

    const createCourseService = async (form: TCreateCourseData) => {
        try {
            const data = await adminHttp.createCourseHttp(form);

            if (data) {
                pushMessageNotification({
                    type: "success",
                    message: "Curso criado com sucesso",
                    duration: 3000,
                });

                return true;
            }

            throw new Error("erro ao criar o curso");
        } catch (error) {
            pushMessageNotification({
                type: "error",
                message: "Erro ao criar o curso",
                duration: 3000,
            });

            console.error(error);
            return null;
        }
    };

    const updateCourseService = async (form: TCreateCourseData & { id?: number }) => {
        try {
            const data = await adminHttp.updateCourseHttp(form);

            if (data) {
                pushMessageNotification({
                    type: "success",
                    message: "Curso atualizado com sucesso",
                    duration: 3000,
                });
            }

            return data;
        } catch (error) {
            pushMessageNotification({
                type: "error",
                message: "Erro ao atualizar o curso",
                duration: 3000,
            });

            console.error(error);
            return null;
        }
    };

    const deleteCourseService = async (id: number): Promise<boolean | null> => {
        try {
            await adminHttp.deleteCourseHttp(id);
            pushMessageNotification({
                type: "success",
                message: "Curso deletado com sucesso",
                duration: 3000,
            });

            return true;
        } catch (error) {
            pushMessageNotification({
                type: "error",
                message: "Erro ao deletar o curso",
                duration: 3000,
            });

            console.error(error);
            return null;
        }
    };

    return { getCoursesService, createCourseService, updateCourseService, deleteCourseService };
};
