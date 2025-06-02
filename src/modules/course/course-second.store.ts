import { defineStore } from "pinia";
import type {
    TContentExam,
    TContentModule,
    TContentVideoModule,
    TSelectedContent,
    TVskipContent,
} from "./course.types";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { CourseService } from "./course.service";

export const useCourseSecondStore = defineStore("courseSecondStore", () => {
    const courseService = CourseService();
    const route = useRoute();

    const modules = ref<TContentModule[]>([]);
    const exams = ref<TContentExam[]>([]);
    const videoUrl = ref("");
    const videoBlob = ref<string>("");

    const isLoadingModules = ref(false);
    const isLoadingExams = ref(false);
    const isLoadingUrlVideo = ref(false);
    const isLoadingContent = ref(false);

    const skipContent = ref<TVskipContent>({
        moduleId: 0,
        contentId: 0,
        nextModuleId: null,
        nextContentId: null,
        prevModuleId: null,
        prevContentId: null,
    });

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

    const findModuleAndContent = (moduleId: number, contentId: number) => {
        const moduleFound = modules.value.find((module) => module.id === moduleId);
        if (!moduleFound) return null;

        const contentFound = moduleFound.videos.find((content) => content.id === contentId);
        if (!contentFound) return null;

        return { moduleFound, contentFound };
    };

    const createSelectedContent = (
        module: TContentModule,
        content: TContentVideoModule,
    ): TSelectedContent => ({
        id: module.id,
        order: module.order,
        name: module.name,
        description: module.description,
        content: {
            id: content.id,
            name: content.name,
            description: content.description,
            duration: content.duration,
            idProgressVideo: content.idProgressVideo,
            viewed: content.viewed,
        },
    });

    const getUrlVideo = async (idVideo: number) => {
        isLoadingUrlVideo.value = true;
        try {
            if (videoBlob.value) {
                URL.revokeObjectURL(videoBlob.value);
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/streaming/${idVideo}`, {
                headers: {
                    Range: "0",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Erro ao carregar o vídeo: ${response.statusText}`);
            }

            const blob = await response.blob();
            videoBlob.value = URL.createObjectURL(blob);
            videoUrl.value = videoBlob.value;

            return videoUrl.value;
        } catch (err) {
            console.error("Error loading video:", err);
            return null;
        } finally {
            isLoadingUrlVideo.value = false;
        }
    };

    const getSkipInfo = (): TVskipContent => {
        const currentModuleId = selectedContent.value.id;
        const currentContentId = selectedContent.value.content.id;

        const currentModuleIndex = modules.value.findIndex(
            (module) => module.id === currentModuleId,
        );
        if (currentModuleIndex === -1) return skipContent.value;

        const currentModule = modules.value[currentModuleIndex];
        const currentContentIndex = currentModule.videos.findIndex(
            (video) => video.id === currentContentId,
        );
        if (currentContentIndex === -1) return skipContent.value;

        const result: TVskipContent = {
            moduleId: currentModuleId,
            contentId: currentContentId,
            nextModuleId: null,
            nextContentId: null,
            prevModuleId: null,
            prevContentId: null,
        };

        if (currentContentIndex > 0) {
            result.prevModuleId = currentModuleId;
            result.prevContentId = currentModule.videos[currentContentIndex - 1].id;
        } else if (currentModuleIndex > 0) {
            const prevModule = modules.value[currentModuleIndex - 1];
            if (prevModule.videos.length > 0) {
                result.prevModuleId = prevModule.id;
                result.prevContentId = prevModule.videos[prevModule.videos.length - 1].id;
            }
        }

        if (currentContentIndex < currentModule.videos.length - 1) {
            result.nextModuleId = currentModuleId;
            result.nextContentId = currentModule.videos[currentContentIndex + 1].id;
        } else if (currentModuleIndex < modules.value.length - 1) {
            const nextModule = modules.value[currentModuleIndex + 1];
            if (nextModule.videos.length > 0) {
                result.nextModuleId = nextModule.id;
                result.nextContentId = nextModule.videos[0].id;
            }
        }

        return result;
    };

    const setSelectedContentManual = (moduleId: number, contentId: number) => {
        const found = findModuleAndContent(moduleId, contentId);
        if (found) {
            selectedContent.value = createSelectedContent(found.moduleFound, found.contentFound);
        }
    };

    const setSelectedContent = () => {
        if (!modules.value?.length) return;

        for (const module of modules.value) {
            const viewedVideo = module.videos.find((video) => video.viewed);
            if (viewedVideo) {
                selectedContent.value = createSelectedContent(module, viewedVideo);
                return;
            }
        }

        const firstModule = modules.value[0];
        const firstVideo = firstModule.videos[0];
        if (firstVideo) {
            selectedContent.value = createSelectedContent(firstModule, firstVideo);
        }
    };

    const getCourseVideoUrl = async (mode?: "next" | "prev") => {
        isLoadingUrlVideo.value = true;
        try {
            if (mode === "next" && skipContent.value.nextContentId) {
                setSelectedContentManual(
                    skipContent.value.nextModuleId!,
                    skipContent.value.nextContentId,
                );
            } else if (mode === "prev" && skipContent.value.prevContentId) {
                setSelectedContentManual(
                    skipContent.value.prevModuleId!,
                    skipContent.value.prevContentId,
                );
            }

            skipContent.value = getSkipInfo();

            if (selectedContent.value.content.id) {
                return await getUrlVideo(selectedContent.value.content.id);
            }
        } finally {
            isLoadingUrlVideo.value = false;
        }
    };

    const fetchModules = async () => {
        isLoadingModules.value = true;
        try {
            const courseId = route.params.id;
            const response = await courseService.getEnrollmentCoursesService();
            const course = response.find((course: any) => course.idCourse === +courseId);
            if (course) {
                modules.value = course.modules;
            }
            return modules.value;
        } finally {
            isLoadingModules.value = false;
        }
    };

    const fetchExams = async () => {
        isLoadingExams.value = true;
        try {
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
            return exams.value;
        } finally {
            isLoadingExams.value = false;
        }
    };

    const cleanupVideoResources = () => {
        if (videoBlob.value) {
            URL.revokeObjectURL(videoBlob.value);
            videoBlob.value = "";
            videoUrl.value = "";
        }
    };

    const setIsLoadingContent = (value: boolean) => {
        isLoadingContent.value = value;
    };

    watch(selectedContent, () => {
        skipContent.value = getSkipInfo();
    });

    return {
        modules,
        exams,
        selectedContent,
        skipContent,
        videoUrl,
        isLoadingModules,
        isLoadingExams,
        isLoadingUrlVideo,
        isLoadingContent,

        fetchModules,
        fetchExams,
        setSelectedContent,
        setSelectedContentManual,
        getUrlVideo,
        cleanupVideoResources,
        getSkipInfo,
        getCourseVideoUrl,
        setIsLoadingContent,
    };
});
