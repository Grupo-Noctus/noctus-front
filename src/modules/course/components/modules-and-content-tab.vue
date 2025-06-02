<template>
    <v-expansion-panels variant="accordion" elevation="0" class="text-body-2" multiple>
        <div
            v-if="isLoadingContentTab"
            min-height="40"
            class="font-weight-medium d-flex justify-space-between align-center"
            style="height: 50px; width: 100%"
        >
            <v-skeleton-loader type="heading" style="width: 60%"></v-skeleton-loader>
            <v-skeleton-loader type="heading" style="width: 15%"></v-skeleton-loader>
        </div>

        <div v-else-if="!eachCourseTabContent.length" class="text-weight-bold pa-1 py-3">
            Erro ao buscar módulos do curso
        </div>
        <v-expansion-panel
            v-for="courseTabContent in eachCourseTabContent"
            v-else
            :key="courseTabContent.id"
            class="pa-0 rounded-0"
            static
        >
            <v-expansion-panel-title min-height="40" class="font-weight-medium">
                Módulo {{ courseTabContent.id + ": " + courseTabContent.name }}
            </v-expansion-panel-title>
            <v-expansion-panel-text class="pa-0">
                <div v-for="tabContent in courseTabContent.videos" :key="tabContent.id">
                    <v-divider v-if="tabContent.id > 1"></v-divider>
                    <v-card
                        class="content-course"
                        :variant="
                            selectedContent.id === courseTabContent.id &&
                            selectedContent.content.id === tabContent.id
                                ? 'tonal'
                                : 'text'
                        "
                        @click="enterCourse(courseTabContent.id, tabContent.id)"
                    >
                        <div>
                            <v-btn
                                v-if="tabContent.viewed"
                                icon="mdi mdi-checkbox-multiple-marked-circle"
                                density="comfortable"
                                size="small"
                                variant="tonal"
                                :color="iconContentColor"
                                class="pa-1 rounded-lg"
                            ></v-btn>
                            <v-btn
                                v-else
                                icon="mdi mdi-checkbox-multiple-blank-circle-outline"
                                density="comfortable"
                                size="small"
                                variant="tonal"
                                :color="iconContentColor"
                                class="pa-1 rounded-lg"
                            ></v-btn>
                        </div>
                        <div class="d-flex flex-column ml-4 mt-1">
                            <div class="font-weight-bold text-capitalize">
                                {{ tabContent.name }}
                            </div>
                            <div class="d-flex align-center pa-0 h-100">
                                <span class="mdi mdi-video-outline text-body-1 mr-1 pa-0"></span>
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
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { formatSecondsToHMS } from "@/utils/DateUtils";
import { useIndexStore } from "@/stores/index.store";
import type { TContentModule } from "../course.types";
import { useCourseSecondStore } from "../course-second.store";

const indexStore = useIndexStore();

const courseSecondStore = useCourseSecondStore();

const props = defineProps({
    clickAndEnterMode: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const eachCourseTabContent = computed(() => courseSecondStore.modules);

const isLoadingContentTab = computed(() => courseSecondStore.isLoadingModules);
const iconContentColor = computed(() => (indexStore.isDark ? "#FFFFFF" : "#461CDC"));
const selectedContent = computed(() => courseSecondStore.selectedContent);

onBeforeMount(async () => {
    await courseSecondStore.fetchModules();
    courseSecondStore.setSelectedContent();
});

const enterCourse = async (moduleId: number, videoId: number) => {
    if (props.clickAndEnterMode) {
        return;
    } else {
        courseSecondStore.setSelectedContentManual(moduleId, videoId);
        // await courseSecondStore.fetchModules();
    }
};
</script>

<style scoped>
.content-course {
    display: flex;
    padding: 8px;
    align-items: center;
    box-shadow: none;
    cursor: pointer;
    border-radius: 0;
}

:deep(.v-expansion-panel-title.v-expansion-panel-title--static) {
    padding: 10px;
}

:deep(.v-expansion-panel-text__wrapper) {
    padding: 0px;
}
</style>
