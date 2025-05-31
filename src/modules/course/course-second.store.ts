import { defineStore } from "pinia";
import type {
    TContentExam,
    TContentModule,
    TContentVideoModule,
    TSelectedContent,
} from "./course.types";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { CourseService } from "./course.service";

export const useCourseSecondStore = defineStore("courseSecondStore", () => {
    const courseService = CourseService();

    const modules = ref<TContentModule[]>([]);
    const exams = ref<TContentExam[]>([]);
    const route = useRoute();
    const videoUrl = ref("");

    const isLoadingModules = ref(false);
    const isLoadingExams = ref(false);
    const isLoadingUrlVideo = ref(false);

    const selectedContent = ref<TSelectedContent>({
        id: 0,
        order: 0,
        name: "",
        description: "",
        content: {
            id: 0,
            name: "",
            description: "",
            duration: 0,
            idProgressVideo: 0,
            viewed: 0,
        },
    });

    const getUrlVideo = async (idVideo: number) => {
        isLoadingUrlVideo.value = true;
        const response = await courseService.getStreamingVideoUrlService(idVideo);
        isLoadingUrlVideo.value = false;
        return (videoUrl.value = response);
    };

    const fetchModules = async () => {
        isLoadingModules.value = true;
        const courseId = route.params.id;
        const response = await courseService.getEnrollmentCoursesService();
        const findCourse = response.find((course: any) => course.idCourse === +courseId);
        if (findCourse) {
            modules.value = findCourse.modules;
        }
        isLoadingModules.value = false;
        return modules.value;
    };

    const fetchExams = async () => {
        isLoadingExams.value = true;
        exams.value = [
            {
                id: 1,
                name: "Prova final",
                questionCount: 7,
                checked: true,
            },
            {
                id: 2,
                name: "Prova média",
                questionCount: 5,
                checked: false,
            },
        ];
        isLoadingExams.value = false;
        return exams.value;
    };

    const setSelectedContentManual = (givenModuleId: number, givenContentId: number) => {
        const moduleFound = modules.value.find(
            (module: TContentModule) => module.id === givenModuleId,
        );

        if (moduleFound) {
            const contentFound = moduleFound.videos.find(
                (content: TContentVideoModule) => content.id === givenContentId,
            );
            if (contentFound) {
                selectedContent.value = {
                    id: moduleFound.id,
                    order: moduleFound.order,
                    name: moduleFound.name,
                    description: moduleFound.description,
                    content: {
                        id: contentFound.id,
                        name: contentFound.name,
                        description: contentFound.description,
                        duration: contentFound.duration,
                        idProgressVideo: contentFound.idProgressVideo,
                        viewed: contentFound.viewed,
                    },
                };
                return;
            }
        }

        return {
            id: 0,
            order: 0,
            name: "",
            description: "",
            content: {
                id: 0,
                name: "",
                description: "",
                duration: 0,
                order: 0,
                checked: false,
            },
        };
    };

    const setSelectedContent = () => {
        if (!modules.value || modules.value.length === 0) {
            return;
        }

        modules.value.forEach((e) => {
            e.videos.forEach((c) => {
                if (c.viewed) {
                    selectedContent.value = {
                        id: e.id,
                        order: e.order,
                        name: e.name,
                        description: e.description,
                        content: {
                            id: c.id,
                            name: c.name,
                            description: c.description,
                            duration: c.duration,
                            idProgressVideo: c.idProgressVideo,
                            viewed: c.viewed,
                        },
                    };
                }
            });
        });

        if (
            selectedContent.value.content.id === 0 &&
            selectedContent.value.content.idProgressVideo === 0 &&
            selectedContent.value.id === 0 &&
            selectedContent.value.order === 0
        ) {
            const firstModule = modules.value[0];
            const firstContent = firstModule.videos[0];

            selectedContent.value = {
                id: firstModule.id,
                order: firstModule.order,
                name: firstModule.name,
                description: firstModule.description,
                content: {
                    id: firstContent.id,
                    name: firstContent.name,
                    description: firstContent.description,
                    duration: firstContent.duration,
                    idProgressVideo: firstContent.idProgressVideo,
                    viewed: firstContent.viewed,
                },
            };
        }
    };

    return {
        fetchModules,
        fetchExams,
        isLoadingModules,
        isLoadingExams,
        modules,
        exams,
        selectedContent,
        setSelectedContent,
        setSelectedContentManual,
        getUrlVideo,
        isLoadingUrlVideo,
        videoUrl,
    };
});
