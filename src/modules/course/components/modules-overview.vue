<template>
    <!--<v-skeleton-loader v-if="loading" type="image" width="500"></v-skeleton-loader>-->

    <v-card class="ma-4 border-sm rounded-lg" elevation="0" style="max-width: 500px">
        <v-tabs v-model="selectedTab" bg-color="primary" grow :slider-color="sliderColor">
            <v-tab
                v-for="courseTab in listCourseTab.title"
                :key="courseTab.name"
                v-model="courseTab.model"
                :class="courseTab.style"
                :text="courseTab.name"
            ></v-tab>
        </v-tabs>

        <v-card-text class="pa-0">
            <v-tabs-window v-model="selectedTab">
                <v-tabs-window-item value="modules">
                    <v-expansion-panels
                        variant="accordion"
                        elevation="0"
                        class="text-body-2"
                        multiple
                    >
                        <div
                            v-if="loadingContentCourse"
                            min-height="40"
                            class="font-weight-medium d-flex justify-space-between align-center"
                            style="height: 50px; width: 500px"
                        >
                            <v-skeleton-loader type="heading" width="250"></v-skeleton-loader>
                            <v-skeleton-loader type="heading" width="60"></v-skeleton-loader>
                        </div>

                        <div
                            v-else-if="!eachCourseTabContent.length"
                            class="text-weight-bold pa-1 py-3"
                        >
                            Erro ao buscar módulos do curso
                        </div>
                        <v-expansion-panel
                            v-for="courseTabContent in eachCourseTabContent"
                            v-else
                            :key="courseTabContent.order"
                            class="pa-0"
                            static
                        >
                            <v-expansion-panel-title min-height="40" class="font-weight-medium">
                                Módulo {{ courseTabContent.order + ": " + courseTabContent.name }}
                            </v-expansion-panel-title>
                            <v-expansion-panel-text class="pa-0">
                                <div
                                    v-for="tabContent in courseTabContent.content"
                                    :key="tabContent.id"
                                >
                                    <v-divider v-if="tabContent.id > 1"></v-divider>
                                    <v-card
                                        class="content-course"
                                        @click="enterCourse(tabContent.id)"
                                    >
                                        <div>
                                            <v-btn
                                                icon="mdi-play-circle-outline"
                                                density="comfortable"
                                                size="x-medium"
                                                variant="tonal"
                                                :color="iconContentColor"
                                                class="px-2 py-2 rounded-0"
                                            ></v-btn>
                                        </div>
                                        <div class="d-flex flex-column ml-4 mt-1">
                                            <div class="font-weight-bold text-capitalize">
                                                {{ tabContent.name }}
                                            </div>
                                            <div class="d-flex align-center pa-0 h-100">
                                                <span
                                                    class="mdi mdi-video-outline text-body-1 mr-1 pa-0"
                                                ></span>
                                                <div>
                                                    {{ formatSecondsToHMS(tabContent.duration) }}
                                                </div>
                                            </div>
                                        </div>
                                    </v-card>
                                </div>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-tabs-window-item>
                <v-tabs-window-item value="exams">
                    <div
                        v-if="loadingExamCourse"
                        min-height="40"
                        class="font-weight-medium d-flex justify-space-between align-center"
                        style="height: 50px; width: 500px"
                    >
                        <v-skeleton-loader type="heading" width="80"></v-skeleton-loader>
                        <v-skeleton-loader type="heading" width="340"></v-skeleton-loader>
                        <v-skeleton-loader type="heading" width="60"></v-skeleton-loader>
                    </div>
                    <div
                        v-else-if="!eachExamTabCourse.length"
                        class="text-center text-weight-bold pa-1 py-3"
                    >
                        Erro ao buscar tarefas do curso
                    </div>
                    <v-card
                        v-for="examTabCourse in eachExamTabCourse"
                        v-else
                        :key="examTabCourse.id"
                        class="rounded-0"
                        @click="enterExam(1)"
                    >
                        <v-divider v-if="examTabCourse.id > 1"></v-divider>
                        <div class="content-course justify-space-between align-center">
                            <div>
                                <v-btn
                                    icon="mdi mdi-format-list-checks"
                                    density="comfortable"
                                    size="x-medium"
                                    variant="tonal"
                                    :color="iconContentColor"
                                    class="px-2 py-2 rounded-0"
                                >
                                </v-btn>
                            </div>
                            <div class="ml-4 mt-1">
                                <div class="text-capitalize">
                                    Avaliação: {{ examTabCourse.name }}
                                </div>
                            </div>
                            <div>
                                <v-chip
                                    variant="tonal"
                                    color="primary"
                                    style="width: fit-content"
                                    size="small"
                                    density="compact"
                                >
                                    <template #append>
                                        <div>{{ examTabCourse.questionCount }}</div>
                                    </template>
                                    Questões:
                                </v-chip>
                            </div>
                        </div>
                    </v-card>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import router from "@/plugins/router/router";
import { useIndexStore } from "@/stores/index.store";
import { formatSecondsToHMS } from "@/utils/DateUtils";
import { computed, onMounted, ref } from "vue";
import { useCourseStore } from "../course.store";

const indexStore = useIndexStore();
const courseStore = useCourseStore();

const loadingContentCourse = ref(true);
const loadingExamCourse = ref(true);

const eachCourseTabContent = ref();
const eachExamTabCourse = ref();

const selectedTab = ref("modules");

const listCourseTab = computed(() => {
    return {
        title: [
            {
                name: "Módulo",
                style: "text-capitalize text-body-2 font-weight-bold",
                model: "module",
            },
            {
                name: "Avaliações",
                style: "text-capitalize text-body-2 font-weight-bold",
                model: "exam",
            },
        ],
    };
});

onMounted(async () => {
    // colocar um promisse all
    eachCourseTabContent.value = await courseStore.getContentModule();
    eachExamTabCourse.value = await courseStore.getContentExam();
    loadingContentCourse.value = false;
    loadingExamCourse.value = false;
});

const sliderColor = computed(() => (indexStore.isDark ? "#6BFF50" : "#FFFFFF"));
const iconContentColor = computed(() => (indexStore.isDark ? "#FFFFFF" : "#461CDC"));

const enterCourse = (idCourse: number) => {
    return router.push({ name: "CourseVideo", params: { video: idCourse } });
};
const enterExam = (idCourse: number) => {
    return console.log("entrar no exame");
};
</script>

<style scoped>
.content-course {
    display: flex;
    padding: 8px;
    align-items: center;
    box-shadow: none;
    cursor: pointer;
}

:deep(.v-theme--light .v-expansion-panel-title.v-expansion-panel-title--active) {
    background-color: rgba(70, 28, 220, 0.2);
    color: rgb(70, 28, 220);
    height: 20px;
}
:deep(.v-theme--dark .v-expansion-panel-title.v-expansion-panel-title--active) {
    background-color: rgba(255, 255, 255, 0.055);
    color: white;
}

:deep(.v-expansion-panel-title.v-expansion-panel-title--static) {
    padding: 10px;
}

:deep(.v-expansion-panel-text__wrapper) {
    padding: 0px;
}
</style>
