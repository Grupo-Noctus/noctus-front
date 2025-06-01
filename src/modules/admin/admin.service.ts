import { adminHttp } from "@/plugins/api/http-instances";
import { pushMessageNotification } from "@/utils/notivue-base";
import type {
    TCourses,
    TCreateContentData,
    TCreateCourseData,
    TCreateModuleData,
} from "./admin.types";

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

    const createModuleService = async (form: TCreateModuleData, courseId: number) => {
        try {
            const data = await adminHttp.createModuleHttp(form, courseId);

            if (data) {
                pushMessageNotification({
                    type: "success",
                    message: "Módulo criado com sucesso",
                    duration: 3000,
                });

                return true;
            }

            throw new Error("erro ao criar o módulo");
        } catch (error) {
            pushMessageNotification({
                type: "error",
                message: "Erro ao criar o módulo",
                duration: 3000,
            });

            console.error(error);
            return null;
        }
    };

    const updateModuleService = async (form: TCreateModuleData, moduleId: number) => {
        try {
            const data = await adminHttp.updateModuleHttp(form, moduleId);

            if (data) {
                pushMessageNotification({
                    type: "success",
                    message: "Módulo atualizado com sucesso",
                    duration: 3000,
                });

                return true;
            }

            throw new Error("erro ao atualizar o módulo");
        } catch (error) {
            pushMessageNotification({
                type: "error",
                message: "Erro ao atualizar o módulo",
                duration: 3000,
            });

            console.error(error);
            return null;
        }
    };

    const deleteModuleService = async (moduleId: number): Promise<boolean> => {
        try {
            await adminHttp.deleteModuleHttp(moduleId);
            pushMessageNotification({
                type: "success",
                message: "Módulo deletado com sucesso",
                duration: 3000,
            });

            return true;
        } catch (error) {
            pushMessageNotification({
                type: "error",
                message: "Erro ao deletar o módulo",
                duration: 3000,
            });

            console.error(error);
            return false;
        }
    };

    const createContentService = async (form: TCreateContentData, moduleId: number) => {
        try {
            const data = await adminHttp.createContentHttp(form, moduleId);

            if (data) {
                pushMessageNotification({
                    type: "success",
                    message: "Conteúdo criado com sucesso",
                    duration: 3000,
                });

                return true;
            }

            throw new Error("erro ao criar o conteúdo");
        } catch (error) {
            pushMessageNotification({
                type: "error",
                message: "Erro ao criar o conteúdo",
                duration: 3000,
            });

            console.error(error);
            return null;
        }
    };

    const updateContentService = async (form: TCreateContentData, contentId: number) => {
        try {
            const data = await adminHttp.updateContentHttp(form, contentId);

            if (data) {
                pushMessageNotification({
                    type: "success",
                    message: "Conteúdo atualizado com sucesso",
                    duration: 3000,
                });
            }

            return data;
        } catch (error) {
            pushMessageNotification({
                type: "error",
                message: "Erro ao atualizar o conteúdo",
                duration: 3000,
            });

            console.error(error);
            return null;
        }
    };

    const deleteContentService = async (videoId: number): Promise<boolean> => {
        try {
            await adminHttp.deleteContentHttp(videoId);
            pushMessageNotification({
                type: "success",
                message: "Conteúdo deletado com sucesso",
                duration: 3000,
            });

            return true;
        } catch (error) {
            pushMessageNotification({
                type: "error",
                message: "Erro ao deletar o conteúdo",
                duration: 3000,
            });

            console.error(error);
            return false;
        }
    };

    return {
        getCoursesService,
        createCourseService,
        updateCourseService,
        deleteCourseService,
        createModuleService,
        updateModuleService,
        deleteModuleService,
        createContentService,
        updateContentService,
        deleteContentService,
    };
};
